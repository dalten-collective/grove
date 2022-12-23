/* eslint-disable no-param-reassign */
import {
  applyPatches,
  Patch,
  produceWithPatches,
  setAutoFreeze,
  enablePatches,
} from 'immer';
import { compose } from 'lodash/fp';
import _ from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Urbit, {
  FatalError,
  SubscriptionRequestInterface,
} from '@urbit/http-api';
import UrbitMock from '@tloncorp/mock-http-api';
import { Poke } from '@urbit/api';
import api from '../api';
import {
  clearStorageMigration,
  createStorageKey,
  storageVersion,
} from '../logic/utils';

setAutoFreeze(false);
enablePatches();

export const stateSetter = <T extends Record<string, unknown>>(
  fn: (state: any) => void,
  set: (newState: T & BaseState<T>) => void,
  get: () => T & BaseState<T>
): void => {
  const old = get();
  const [state] = produceWithPatches(old, fn) as readonly [
    T & BaseState<T>,
    any,
    Patch[]
  ];
  // console.log(patches);
  set(state);
};

export const optStateSetter = <T extends Record<string, unknown>>(
  fn: (state: T & BaseState<T>) => void,
  set: (newState: T & BaseState<T>) => void,
  get: () => T & BaseState<T>
): string => {
  const old = get();
  const id = _.uniqueId();
  const [state, , patches] = produceWithPatches(old, fn) as readonly [
    T & BaseState<T>,
    any,
    Patch[]
  ];
  set({ ...state, patches: { ...state.patches, [id]: patches } });
  return id;
};

export const reduceState = <S extends Record<string, unknown>, U>(
  state: any,
  data: U,
  reducers: ((payload: U, current: S & BaseState<S>) => S & BaseState<S>)[]
): void => {
  const reducer = compose(reducers.map((r) => (sta) => r(data, sta)));
  state.getState().set((s: any) => {
    reducer(s);
  });
};

export const reduceStateN = <S extends Record<string, unknown>, U>(
  state: S & BaseState<S>,
  data: U,
  reducers: ((payload: U, current: S & BaseState<S>) => S & BaseState<S>)[]
): void => {
  const reducer = compose(reducers.map((r) => (sta) => r(data, sta)));
  state.set(reducer);
};

export const optReduceState = <S extends Record<string, unknown>, U>(
  state: any,
  data: U,
  reducers: ((payload: U, current: S & BaseState<S>) => BaseState<S> & S)[]
): string => {
  const reducer = compose(reducers.map((r) => (sta) => r(data, sta)));
  return state.getState().optSet((s: any) => {
    reducer(s);
  });
};

/* eslint-disable-next-line import/no-mutable-exports */
export let stateStorageKeys: string[] = [];

export const stateStorageKey = (stateName: string): string => {
  const key = createStorageKey(`${stateName}State`);
  stateStorageKeys = [...new Set([...stateStorageKeys, key])];
  return key;
};

(window as any).clearStates = () => {
  stateStorageKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export interface BaseState<StateType extends Record<string, unknown>> {
  rollback: (id: string) => void;
  patches: {
    [id: string]: Patch[];
  };
  set: (fn: (state: StateType & BaseState<StateType>) => void) => void;
  addPatch: (id: string, ...patch: Patch[]) => void;
  removePatch: (id: string) => void;
  optSet: (fn: (state: StateType & BaseState<StateType>) => void) => string;
  initialize: (airlock: Urbit | UrbitMock) => Promise<void>;
}

export function createSubscription(
  app: string,
  path: string,
  e: (data: any) => void
): SubscriptionRequestInterface {
  const request = {
    app,
    path,
    event: e,
    err: () => null,
    quit: () => {
      throw new FatalError('subscription clogged');
    },
  };
  // TODO: err, quit handling (resubscribe?)
  return request;
}

export const createState = <T extends Record<string, unknown>>(
  name: string,
  properties: T | ((set: any, get: any) => T),
  whitelist: any,
  subscriptions: ((set: any, get: any) => SubscriptionRequestInterface)[] = []
): any =>
  create(
    devtools(
      persist(
        (set: any, get: any) => ({
          initialize: async (airlock: Urbit) => {
            await Promise.all(
              subscriptions.map((sub) => airlock.subscribe(sub(set, get)))
            );
          },
          set: (fn: any) => stateSetter(fn, set, get),
          optSet: (fn: any) => optStateSetter(fn, set, get),
          patches: {},
          addPatch: (id: string, patch: Patch[]) => {
            set((s: any) => ({ ...s, patches: { ...s.patches, [id]: patch } }));
          },
          removePatch: (id: string) => {
            set((s: any) => ({ ...s, patches: _.omit(s.patches, id) }));
          },
          rollback: (id: string) => {
            set((state: any) => {
              const applying = state.patches[id];
              return {
                ...applyPatches(state, applying),
                patches: _.omit(state.patches, id),
              };
            });
          },
          ...(typeof properties === 'function'
            ? (properties as any)(set, get)
            : properties),
        }),
        {
          whitelist,
          name: stateStorageKey(name),
          version: storageVersion,
          migrate: clearStorageMigration,
        }
      )
    )
  );

export async function doOptimistically<A, S extends Record<string, unknown>>(
  state: any,
  action: A,
  call: (a: A) => Promise<any>,
  reduce: ((a: A, fn: S & BaseState<S>) => S & BaseState<S>)[]
) {
  let num: string | undefined;
  try {
    num = optReduceState(state, action, reduce);
    await call(action);
    state.getState().removePatch(num);
  } catch (e) {
    console.error(e);
    if (num) {
      state.getState().rollback(num);
    }
  }
}

export async function pokeOptimisticallyN<A, S extends Record<string, unknown>>(
  state: any,
  poke: Poke<any>,
  reduce: ((a: A, fn: S & BaseState<S>) => S & BaseState<S>)[]
) {
  let num: string | undefined;
  try {
    num = optReduceState(state, poke.json, reduce);
    await api.poke(poke);
    state.getState().removePatch(num);
  } catch (e) {
    console.error(e);
    if (num) {
      state.getState().rollback(num);
    }
  }
}
