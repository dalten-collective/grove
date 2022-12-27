/* eslint-disable @typescript-eslint/no-use-before-define */
import create from 'zustand';
import { useCallback, useEffect, useState } from 'react';
import { omit, pick } from 'lodash';
import { scryAllies, scryAllyTreaties, scryCharges, scryDefaultAlly, docketInstall, kilnRevive, kilnSuspend, allyShip, } from '@urbit/api';
import { normalizeUrbitColor } from '@/logic/utils';
import api from '../api';
const useDocketState = create((set, get) => ({
    defaultAlly: null,
    fetchDefaultAlly: async () => {
        const defaultAlly = await api.scry(scryDefaultAlly);
        set({ defaultAlly });
    },
    fetchCharges: async () => {
        const charg = (await api.scry(scryCharges)).initial;
        const charges = Object.entries(charg).reduce((obj, [key, value]) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = normalizeDocket(value, key);
            return obj;
        }, {});
        set({ charges });
    },
    fetchAllies: async () => {
        const allies = (await api.scry(scryAllies)).ini;
        set({ allies });
        return allies;
    },
    fetchAllyTreaties: async (ally) => {
        let treaties = (await api.scry(scryAllyTreaties(ally)))
            .ini;
        treaties = normalizeDockets(treaties);
        set((s) => ({ treaties: { ...s.treaties, ...treaties } }));
        return treaties;
    },
    requestTreaty: async (ship, desk) => {
        const { treaties } = get();
        const key = `${ship}/${desk}`;
        if (key in treaties) {
            return treaties[key];
        }
        const result = await api.subscribeOnce('treaty', `/treaty/${key}`, 20000);
        const treaty = { ...normalizeDocket(result, desk), ship };
        set((state) => ({
            treaties: { ...state.treaties, [key]: treaty },
        }));
        return treaty;
    },
    installDocket: async (ship, desk) => {
        const treaty = get().treaties[`${ship}/${desk}`];
        if (!treaty) {
            throw new Error('Bad install');
        }
        set((state) => addCharge(state, desk, { ...treaty, chad: { install: null } }));
        return api.poke(docketInstall(ship, desk));
    },
    uninstallDocket: async (desk) => {
        set((state) => delCharge(state, desk));
        await api.poke({
            app: 'docket',
            mark: 'docket-uninstall',
            json: desk,
        });
    },
    toggleDocket: async (desk) => {
        const { charges } = get();
        const charge = charges[desk];
        if (!charge) {
            return;
        }
        const suspended = 'suspend' in charge.chad;
        if (suspended) {
            await api.poke(kilnRevive(desk));
        }
        else {
            await api.poke(kilnSuspend(desk));
        }
    },
    treaties: {},
    charges: {},
    allies: {},
    addAlly: async (ship) => {
        set((draft) => {
            draft.allies[ship] = [];
        });
        return api.poke(allyShip(ship));
    },
    set,
}));
function normalizeDocket(docket, desk) {
    return {
        ...docket,
        desk,
        color: normalizeUrbitColor(docket.color),
    };
}
function normalizeDockets(dockets) {
    return Object.entries(dockets).reduce((obj, [key, value]) => {
        const [, desk] = key.split('/');
        // eslint-disable-next-line no-param-reassign
        obj[key] = normalizeDocket(value, desk);
        return obj;
    }, {});
}
function addCharge(state, desk, charge) {
    return {
        charges: {
            ...state.charges,
            [desk]: normalizeDocket(charge, desk),
        },
    };
}
function delCharge(state, desk) {
    return { charges: omit(state.charges, desk) };
}
api.subscribe({
    app: 'docket',
    path: '/charges',
    event: (data) => {
        useDocketState.setState((state) => {
            if ('add-charge' in data) {
                const { desk, charge } = data['add-charge'];
                return addCharge(state, desk, charge);
            }
            if ('del-charge' in data) {
                const desk = data['del-charge'];
                return delCharge(state, desk);
            }
            return { charges: state.charges };
        });
    },
});
api.subscribe({
    app: 'treaty',
    path: '/treaties',
    event: (data) => {
        useDocketState.getState().set((draft) => {
            if ('add' in data) {
                const { ship, desk } = data.add;
                const treaty = normalizeDocket(data.add, desk);
                draft.treaties[`${ship}/${desk}`] = treaty;
            }
            if ('ini' in data) {
                const treaties = normalizeDockets(data.ini);
                draft.treaties = { ...draft.treaties, ...treaties };
            }
        });
    },
});
api.subscribe({
    app: 'treaty',
    path: '/allies',
    event: (data) => {
        useDocketState.getState().set((draft) => {
            if ('new' in data) {
                const { ship, alliance } = data.new;
                draft.allies[ship] = alliance;
            }
        });
    },
});
const selCharges = (s) => s.charges;
export function useCharges() {
    return useDocketState(selCharges);
}
export function useCharge(desk) {
    return useDocketState(useCallback((state) => state.charges[desk], [desk]));
}
const selRequest = (s) => s.requestTreaty;
export function useRequestDocket() {
    return useDocketState(selRequest);
}
const selAllies = (s) => s.allies;
export function useAllies() {
    return useDocketState(selAllies);
}
export function useAllyTreaties(ship) {
    const allies = useAllies();
    const isAllied = ship in allies;
    const [status, setStatus] = useState('initial');
    const [treaties, setTreaties] = useState();
    useEffect(() => {
        if (Object.keys(allies).length > 0 && !isAllied) {
            setStatus('loading');
            useDocketState.getState().addAlly(ship);
        }
    }, [allies, isAllied, ship]);
    useEffect(() => {
        async function fetchTreaties() {
            if (isAllied) {
                setStatus('loading');
                try {
                    const newTreaties = await useDocketState
                        .getState()
                        .fetchAllyTreaties(ship);
                    if (Object.keys(newTreaties).length > 0) {
                        setTreaties(newTreaties);
                        setStatus('success');
                    }
                }
                catch {
                    setStatus('error');
                }
            }
        }
        fetchTreaties();
    }, [ship, isAllied]);
    const storeTreaties = useDocketState(useCallback((s) => {
        const charter = s.allies[ship];
        return pick(s.treaties, ...(charter || []));
    }, [ship]));
    useEffect(() => {
        const timeout = setTimeout(() => {
            setStatus('error');
        }, 30 * 1000); // wait 30 secs before timing out
        if (Object.keys(storeTreaties).length > 0) {
            setTreaties(storeTreaties);
            setStatus('success');
            clearTimeout(timeout);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [storeTreaties]);
    return {
        isAllied,
        treaties,
        status,
    };
}
export function useTreaty(host, desk) {
    return useDocketState(useCallback((s) => {
        const ref = `${host}/${desk}`;
        return s.treaties[ref];
    }, [host, desk]));
}
export function allyForTreaty(ship, desk) {
    const ref = `${ship}/${desk}`;
    const { allies } = useDocketState.getState();
    const ally = Object.entries(allies).find(([, allied]) => allied.includes(ref))?.[0];
    return ally;
}
export const landscapeTreatyHost = import.meta.env.LANDSCAPE_HOST;
export default useDocketState;
