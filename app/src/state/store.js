import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import produce from 'immer';
import { events } from './faces';

// import { pokes } from '../urbit/pokes';
import { scries, scriesWithCb } from '../urbit/scries';

export const getActions = (state) => ({
  onFact: {
    [events.NODE.ADD.FACE]: [state.fetchTree],
    [events.NODE.REM.FACE]: [state.remNode],
    [events.NODE.EDIT.FACE]: [state.editNode],
    // [events.NODE.MOVE.FACE]: [state.moveNode],
    [events.FOLDER.ADD.FACE]: [state.fetchTree],
    [events.FOLDER.REM.FACE]: [state.fetchTree],
    [events.FOLDER.MOVE.FACE]: [state.fetchTree],
    [events.MODERATORS.ADD.FACE]: [state.addModerators],
    [events.MODERATORS.REM.FACE]: [state.removeModerators],
    [events.TROVE.NEW.FACE]: [state.newTrove],
  },
});

export const getScryActions = (state) => ({
  tree: state.fetchTree,
  troveState: state.fetchTroveState,
  hosts: state.fetchHosts,
});

// export const defaultContext = { src: 'NO_SRC', urbit: window?.urbit };

export const useStore = create(
  devtools(
    immer((set, get) => ({
      // ...initialState,
      troveState: {
        troves: {},
        version: '0',
      },
      ships: {},
      troves: {},
      tree: {},
      hosts: [],
      moderators: {},
      regulations: {},
      version: '0',
      // pokes,

      getShips: () => get().ships,
      getTroves: () => get().troves,

      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      getTree: () => get().tree,
      setTree: (tree) =>
        set(
          produce((draft) => {
            draft.tree = tree;
          })
        ),
      fetchTree: async (urbit, args) => {
        const tree = await scries.tree(urbit, args);
        get().setTree(tree);
      },
      // Example of using a callback to set state
      cbStyleFetchTree: async (urbit, { cb = get().setTree, ...args }) => {
        const tree = await scriesWithCb.tree(urbit, { cb, ...args });
        return tree;
        // cb(tree);
      },
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      getTroveState: () => get().troveState,
      setTroveState: (troveState) =>
        set(
          produce((draft) => {
            draft.troveState = troveState;
            draft.troves = troveState.troves;
            draft.version = troveState.version;
            draft.ships = troveState.ships;
          })
        ),
      fetchTroveState: async (urbit) => {
        const troveState = await scries.troveState(urbit);
        get().setTroveState(troveState);
      },
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      getHosts: () => get().hosts,
      setHosts: (hosts) =>
        set(
          produce((draft) => {
            draft.hosts = hosts;
          })
        ),
      fetchHosts: async (urbit) => {
        const hosts = await scries.hosts(urbit);
        get().setHosts(hosts);
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
      // remove a node from a folder
      remNode: (host, space, folder, nodeId) =>
        set(
          produce((draft) => {
            const path = `${host}/${space}/${folder}`;
            if (draft.trove[path]) {
              delete draft.trove[path][nodeId];
            }
          })
        ),
      // edit a node in a folder
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
      // update regulations for a given space and folder
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
    }))
  )
);
