import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import api from '../api';
export function emptyCarpet(seam) {
    return {
        seam,
        yarns: {},
        cable: [],
        stitch: 0,
    };
}
export function emptyBlanket(seam) {
    return {
        seam,
        yarns: {},
        quilt: {},
    };
}
function harkAction(action) {
    return {
        app: 'hark',
        mark: 'hark-action',
        json: action,
    };
}
const useHarkState = create((set, get) => ({
    set: (fn) => {
        set(produce(get(), fn));
    },
    batchSet: (fn) => {
        batchUpdates(() => {
            get().set(fn);
        });
    },
    carpet: emptyCarpet({ desk: window.desk }),
    blanket: emptyBlanket({ desk: window.desk }),
    textiles: {},
    groupSubs: [],
    start: async () => {
        get().retrieve();
        api.subscribe({
            app: 'hark',
            path: '/ui',
            event: (_event) => {
                const { groupSubs, retrieve, retrieveGroup } = get();
                retrieve();
                groupSubs.forEach((g) => {
                    retrieveGroup(g);
                });
            },
        });
    },
    retrieve: async () => {
        const carpet = await api.scry({
            app: 'hark',
            path: `/desk/${window.desk}/latest`,
        });
        const blanket = await api.scry({
            app: 'hark',
            path: `/desk/${window.desk}/quilt/${carpet.stitch}`,
        });
        get().batchSet((draft) => {
            draft.carpet = carpet;
            draft.blanket = blanket;
        });
    },
    retrieveGroup: async (flag) => {
        const carpet = await api.scry({
            app: 'hark',
            path: `/group/${flag}/latest`,
        });
        const blanket = await api.scry({
            app: 'hark',
            path: `/group/${flag}/quilt/${carpet.stitch}`,
        });
        get().batchSet((draft) => {
            draft.textiles[flag] = {
                carpet,
                blanket,
            };
            if (!get().groupSubs.includes(flag)) {
                draft.groupSubs.push(flag);
            }
        });
    },
    releaseGroup: async (flag) => {
        get().batchSet((draft) => {
            const index = draft.groupSubs.indexOf(flag);
            if (index !== -1) {
                draft.groupSubs.splice(index, 1);
            }
        });
    },
    sawRope: async (rope) => {
        await api.poke(harkAction({
            'saw-rope': rope,
        }));
    },
    sawSeam: async (seam) => {
        api.poke(harkAction({
            'saw-seam': seam,
        }));
    },
}));
export default useHarkState;
