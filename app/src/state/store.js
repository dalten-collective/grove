import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import produce from 'immer';
import mergeDeepRight from 'ramda/es/mergeDeepRight';

import { events } from './faces';
import { getStateFromEvt, getShipName, getHostSpace } from '../utils';
import { indexTree, createLookupTable } from '../utils/indexTree';
import { getHostSpaceShape } from '../utils/config';
import { scries, scriesWithCb } from '../urbit/scries';
import { createStore } from './storeMiddleware';

// const [] = useStore((state) => (state.tree), shallow)
export const getShorthandHost = (state) =>
  getShipName(state.selectedTrove.host);

export const getTree = (state) =>
  Object.values(state.troves) && Object.values(state.troves)[0]?.tree;

export const getLookupTableAtSelectedSpace = (state) =>
  state.lookupTable[state.selectedHostSpace];

export const getLookupTableAtSelectedPath = (state) =>
  state.lookupTable[state.selectedPath];

// export const getDateUploaded = (state) =>
export const getActions = (state) => ({
  onFact: {
    [events.TROVE.INITIAL_STATE.FACE]: [state.setTroves],
    [events.TROVE.NEW.FACE]: [state.newTrove],

    [events.NODE.ADD.FACE]: [state.fetchTree],
    [events.NODE.REM.FACE]: [state.remNode],
    [events.NODE.EDIT.FACE]: [state.editNode],
    // [events.NODE.MOVE.FACE]: [state.moveNode],

    [events.FOLDER.ADD.FACE]: [state.fetchTree],
    [events.FOLDER.REM.FACE]: [state.fetchTree],
    [events.FOLDER.MOVE.FACE]: [state.fetchTree],

    [events.MODERATORS.ADD.FACE]: [state.addModerators],
    [events.MODERATORS.REM.FACE]: [state.removeModerators],
  },
});

export const getScryActions = (state) => ({
  tree: state.fetchTree,
  troves: state.fetchTroves,
  hosts: state.fetchHosts,
  allTrees: state.fetchTreesForAllTroves,
});

export const useStore = createStore(
  (set, get) => ({
    // ...initialState,
    troves: {},
    hosts: [],
    moderators: {},
    regulations: {},
    lookupTable: {},
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    selectedTrove: { initialized: false, host: '', space: '', path: '' },
    selectedPath: '',
    selectedHostSpace: '',
    selectedViewOption: 'list',

    _hasHydrated: false,

    // storage: storageSlice(),
    setHasHydrated: (state) =>
      set(
        produce((draft) => {
          draft._hasHydrated = state;
        })
      ),
    setSelectedViewOption: (option) =>
      set(
        produce((draft) => {
          draft.selectedViewOption = option;
        })
      ),
    setSelectedHostSpace: (hostSpace) =>
      set(
        produce((draft) => {
          draft.selectedHostSpace = hostSpace;
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    getSelectedTrove: () => get().selectedTrove,
    getSelectedPath: () => get().selectedPath,

    setSelectedTrove: (host, space, path = '') =>
      set(
        produce((draft) => {
          draft.selectedTrove = { initialized: true, host, space, path };
          draft.selectedPath = path;
        })
      ),
    setSelectedPath: (path, trove = null) =>
      set(
        produce((draft) => {
          const pathFrags = path.slice().split('/');
          if (pathFrags.length > 1) {
            const [host, space] = pathFrags;
            draft.selectedTrove = {
              initialized: true,
              host,
              space,
              path: `${host}/${space}`,
            };
          }
          draft.selectedTrove = trove || draft.selectedTrove;
          draft.selectedPath = path;
          draft.selectedTrove.path = draft.selectedTrove.path || path;
        })
      ),
    setInitialTrove: (withHosts = []) => {
      const hosts = withHosts.length ? withHosts : get().hosts;
      const [host, space] = getHostSpace(hosts[0]);
      get().setSelectedTrove(host, space, hosts[0]);
      get().setSelectedHostSpace(hosts[0]);
    },
    selectInitialTrove: () => {},
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    getTree: () => get().tree,
    setTree: (hostSpace, tree) =>
      set(
        produce((draft) => {
          if (draft.troves[hostSpace]) {
            draft.troves[hostSpace].tree = tree;
          } else {
            draft.troves = { [hostSpace]: { tree } };
          }
        })
      ),
    createLookupTable: (hostSpace, _tree) => {
      const tree = _tree || get().troves[hostSpace]?.tree;
      const lookupTable = createLookupTable(tree);
      get().setTreeLookupTable(hostSpace, lookupTable);
    },

    setTreeLookupTable: (hostSpace, lookupTable) =>
      set(
        produce((draft) => {
          if (draft.lookupTable[hostSpace]) {
            draft.lookupTable[hostSpace] = lookupTable;
          } else {
            draft.lookupTable = { [hostSpace]: lookupTable };
          }
        })
      ),

    fetchTree: async (urbit, args) => {
      const _tree = await scries.tree(urbit, args);
      const hostSpaceShape = getHostSpaceShape(args);
      const tree = indexTree(getStateFromEvt(_tree), hostSpaceShape);
      get().setTree(hostSpaceShape, tree);
      // get().createLookupTable(hostSpaceShape, tree);
    },
    fetchTreesForAllTroves: async (urbit) => {
      const hosts = get().hosts;
      if (hosts && hosts.length) {
        await Promise.all([
          hosts.forEach(
            async (hostSpace) =>
              await get().fetchTree(urbit, { host: hostSpace })
          ),
        ]);
      }
    },
    // Example of using a callback to set state
    cbStyleFetchTree: async (urbit, { cb = get().setTree, ...args }) => {
      const tree = await scriesWithCb.tree(urbit, { cb, ...args });
      return tree;
      // cb(tree);
    },
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    getTroves: () => get().troves,
    setTroves: (urbit, _troveState) =>
      set(
        produce((draft) => {
          const troveState = getStateFromEvt(_troveState);
          Object.keys(troveState.troves).forEach((hostSpace) => {
            if (draft.troves[hostSpace]) {
              // This is ugly but actually immutable
              draft.troves[hostSpace].regs = troveState.troves[hostSpace].regs;
              draft.troves[hostSpace].team = troveState.troves[hostSpace].team;
              draft.troves[hostSpace].trove =
                troveState.troves[hostSpace].trove;
            } else {
              draft.troves[hostSpace] = troveState.troves[hostSpace];
            }
          });
        })
      ),
    fetchTroves: async (urbit) => {
      const troveState = await scries.troveState(urbit);
      get().setTroves(troveState);
    },
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    getHosts: () => get().hosts,
    setHosts: (hosts) =>
      set(
        produce((draft) => {
          draft.hosts = getStateFromEvt(hosts);
        })
      ),
    fetchHosts: async (urbit) => {
      const hosts = await scries.hosts(urbit);
      get().setHosts(hosts);
      get().setInitialTrove(hosts);
    },
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    addNode: (host, space, folder, node) =>
      set(
        produce((draft) => {
          const path = `${host}/${space}/${folder}`;
          draft.trove[path] = draft.trove[path] || {};
          draft.trove[path][node.id] = node;
        })
      ),
    remNode: (host, space, folder, nodeId) =>
      set(
        produce((draft) => {
          const path = `${host}/${space}/${folder}`;
          if (draft.trove[path]) {
            delete draft.trove[path][nodeId];
          }
        })
      ),
    editNode: (host, space, folder, nodeId, updates) =>
      set(
        produce((draft) => {
          const path = `${host}/${space}/${folder}`;
          if (draft.trove[path]) {
            draft.trove[path][nodeId] = {
              ...draft.trove[path][nodeId],
              ...updates,
            };
          }
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    getModerators: () => get().moderators,
    addModerators: (host, space, moderators) =>
      set(
        produce((draft) => {
          draft.moderators[`${host}/${space}`] = [
            ...draft.moderators,
            ...moderators,
          ];
        })
      ),
    remModerators: (host, space, moderators) =>
      set(
        produce((draft) => {
          draft.moderators[`${host}/${space}`].filter(
            (moderator) => !moderators.includes(moderator)
          );
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    updateRegs: (host, space, folder, regulations) =>
      set(
        produce((draft) => {
          const key = `${host}/${space}/${folder}`;
          draft.regulations[key] = regulations;
        })
      ),

    repeat: (fromSpace, fromFolder, fromFile, toSpace, toFolder, toFile) => {
      set((state) => {
        return produce(state, (draft) => {
          // Look up the source file and make a copy of it in the destination folder
          const from = draft.spaces[fromSpace][fromFolder][fromFile];
          draft.spaces[toSpace][toFolder][toFile] = { ...from };
        });
      });
    },

    repermissions: (host, space, folder, permissions) => {
      set((state) => {
        return produce(state, (draft) => {
          // Update the permissions for the specified folder
          draft.spaces[host][space][folder].permissions = permissions;
        });
      });
    },
  }),
  {
    name: 'trove',
    version: 0,
    partialize: (state) => ({
      hosts: state.hosts,
      selectedPath: state.selectedPath,
      selectedHostSpace: state.selectedHostSpace,
      troves: state.troves,
      lookupTable: state.lookupTable,
    }),
    merge: (persistedState, currentState) =>
      mergeDeepRight(currentState, persistedState),
    onRehydrateStorage: () => (state) => {
      state.setHasHydrated(true);
    },
  }
);

export const useLookupTable = () => {
  const _createLookupTable = useStore((state) => state.createLookupTable);
  useEffect(() =>
    useStore.subscribe(getTree, (tree) =>
      _createLookupTable(tree.hostSpace, tree)
    )
  );
};
