import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import produce from 'immer';
import mergeDeepRight from 'ramda/es/mergeDeepRight';

import { getStateFromEvt } from '../utils';
import { indexTree, createLookupTable } from '../utils/indexTree';
import { getHostSpaceShape } from '../utils/config';
import { scries, scriesWithCb } from '../urbit/scries';
import { createStore } from './storeMiddleware';
// import { createStore, storageSlice } from './storeMiddleware';
import { getTreeAtSelectedSpace, getTrees } from './selectors';
import { getFragsAndAssertPath } from '../utils/path';
import { clearStorageMigration, createStorageKey } from '../lib/logic/utils';

const USE_SELECTED_TROVE = true;
const USE_SET_PATH_ON_TROVE = false;

// TODO: Split into multiple store slices

export const useStore = createStore(
  (set, get) => ({
    // ...initialState,
    troves: {},
    hosts: [],
    lookupTable: {},
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    selectedTrove: {
      initialized: false,
      host: '',
      space: '',
      path: '',
      reletivePath: '',
    },
    selectedPath: '',
    selectedHostSpace: '',
    selectedRelativePath: '',

    // storage: storageSlice(),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    setHosts: (hosts) =>
      set(
        produce((draft) => {
          draft.hosts = getStateFromEvt(hosts);
        })
      ),
    setSelectedHostSpace: (hostSpace) =>
      set(
        produce((draft) => {
          draft.selectedHostSpace = hostSpace;
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    fetchHosts: async (urbit) => {
      const hosts = await scries.hosts(urbit);
      get().setHosts(hosts);
      get().setInitialTrove(hosts);
    },
    setSelectedPath: (path) =>
      set(
        produce((draft) => {
          const [host, space, ...relFrags] = getFragsAndAssertPath(path);

          draft.selectedPath = path;
          draft.selectedHostSpace = `${host}/${space}`;
          draft.selectedRelativePath = relFrags.length ? relFrags.join('/') : '';

          if (USE_SELECTED_TROVE) get().setSelectedTrove(path);
        })
      ),
    setSelectedTrove: (path = '') =>
      set(
        produce((draft) => {
          const [host, space, ...relFrags] = getFragsAndAssertPath(path);

          draft.selectedTrove = {
            initialized: true,
            host,
            space,
            path,
            relativePath: relFrags.length ? relFrags.join('/') : '',
          };

          if (USE_SET_PATH_ON_TROVE) get().setSelectedPath(path);
        })
      ),
    // TODO: Consider removing this
    setInitialTrove: (withHosts = []) => {
      const [selectedPath, hostSpace] = [
        get().selectedPath,
        get().selectedHostSpace,
      ];
      const currentPath = selectedPath?.length ? selectedPath : null;

      if (!currentPath || !hostSpace?.length) {
        get().setSelectedPath(currentPath || withHosts[0]);
      } else if (USE_SELECTED_TROVE) {
        get().setSelectedTrove(withHosts[0]);
      }
    },
    setTree: (hostSpace, tree) =>
      set(
        produce((draft) => {
          draft.troves[hostSpace].tree = tree;
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
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    createLookupTable: (hostSpace, _tree) => {
      const tree = _tree || get().troves[hostSpace]?.tree;
      const lookupTable = createLookupTable(tree);
      get().setTreeLookupTable(hostSpace, lookupTable);
    },
    createLookupTables: (_trees) => {
      const troves = get().troves;
      const trees = Array.isArray(_trees)
        ? _trees
        : Object.values(troves).map((t) => t.tree);

      trees.forEach((tree) => {
        get().createLookupTable(tree.hostSpace, tree);
      });
    },
    setTreeLookupTable: (hostSpace, lookupTable) =>
      set(
        produce((draft) => {
          draft.lookupTable[hostSpace] = lookupTable;
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    setTroves: (urbit, _troveState) =>
      set(
        produce((draft) => {
          const troveState = getStateFromEvt(_troveState);
          Object.keys(troveState.troves).forEach((hostSpace) => {
            if (draft.troves[hostSpace]) {
              draft.troves[hostSpace].regs = troveState.troves[hostSpace].regs;
              draft.troves[hostSpace].team = troveState.troves[hostSpace].team;
              draft.troves[hostSpace].trove = troveState.troves[hostSpace].trove;
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
    addNode: (host, space, folder, node) =>
      set(
        produce((draft) => {
          const path = `${host}/${space}/${folder}`;
          draft.trove[path] = draft.trove[path] || {};
          draft.trove[path][node.id] = node;
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
    remNode: (host, space, folder, nodeId) =>
      set(
        produce((draft) => {
          const path = `${host}/${space}/${folder}`;
          if (draft.trove[path]) {
            delete draft.trove[path][nodeId];
          }
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //                                 VIEW STATE
    selectedViewOption: 'list',
    showSingleItemPreview: false,
    itemPreviewPath: '',

    setSelectedViewOption: (option) =>
      set(
        produce((draft) => {
          draft.selectedViewOption = option;
        })
      ),
    getSinglePreviewItem: () => {
      if (!get().showSingleItemPreview) return null;
      const pathFrags = get().itemPreviewPath.slice().split('/');
      const nodeId = pathFrags.pop();
      const basePath = pathFrags.join('/');
      return get().lookupTable[get().selectedHostSpace][basePath][nodeId];
    },
    previewSingleItem: (path) => {
      get().setItemPreviewPath(path);
      get().setShowSingleItemPreview(true);
    },
    resetPreviewState: () => {
      get().setShowSingleItemPreview(false);
      get().setItemPreviewPath('');
    },
    setShowSingleItemPreview: (bool) =>
      set(
        produce((draft) => {
          draft.showSingleItemPreview = bool;
        })
      ),
    setItemPreviewPath: (path) =>
      set(
        produce((draft) => {
          draft.itemPreviewPath = path;
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    moderators: {},
    regulations: {},
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
    updateRegs: (host, space, folder, regulations) =>
      set(
        produce((draft) => {
          const key = `${host}/${space}/${folder}`;
          draft.regulations[key] = regulations;
        })
      ),
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // TODO: Consider removing this
    _hasHydrated: false,
    setHasHydrated: (state) =>
      set(
        produce((draft) => {
          draft._hasHydrated = state;
        })
      ),
    // Unused example of using a callback to set state
    cbStyleFetchTree: async (urbit, { cb = get().setTree, ...args }) => {
      const tree = await scriesWithCb.tree(urbit, { cb, ...args });
      return tree;
      // cb(tree);
    },
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  }),
  // {},
  {
    name: createStorageKey('trove-local'),
    version: 0.2,
    migrate: clearStorageMigration,
    partialize: (state) => ({
      hosts: state.hosts,
      selectedPath: state.selectedPath,
      selectedHostSpace: state.selectedHostSpace,
      selectedTrove: state.selectedTrove,
      troves: state.troves,
      lookupTable: state.lookupTable,
    }),
    merge: (persistedState, currentState) =>
      mergeDeepRight(currentState, persistedState),
    onRehydrateStorage: (state) => {
      console.log('hydrating state from persisted storage');
      return (state, error) => {
        if (error) {
          console.error(error);
        } else {
          // console.log('rehydrated state', state);
          state.setHasHydrated(true);
        }
      };
    },
  }
);

export const useLookupTable = () => {
  const _createLookupTables = useStore((state) => state.createLookupTables);
  const bloop = 'bloop';
  useEffect(() => {
    const unsub = useStore.subscribe(
      getTreeAtSelectedSpace,
      (trees) => _createLookupTables(trees),
      shallow
    );
    return unsub;
  }, [bloop]);
};
