import create, { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import produce from 'immer';

const actions = {
  NODE: {
    ADD: addNode,
    REM: remNode,
    EDIT: editNode,
    // MOVE: moveNode,
  },
  FOLDER: {
    ADD: addFolder,
    REM: removeFolder,
    EDIT: editFolder,
    // MOVE: moveFolder,
  },
  REGS: {
    REPERM: repermissions,
  },
  FOLDER: {},
};

// Usage with a plain action store, it will log actions as "setState"
export const useStore = create(
  devtools(
    immer((set, get) => ({
      // ...initialState,
      moderators: {},
      regulations: {},
      trove: {},

      // Actions to update the state here
      addNode,
      remNode,
      editNode,

      addModerators,
      remModerators,

      updateRegs,
      repeat,
      repermissions,
    }))
  )
);

const [useStoreCreateStore, api] = createStore((set) => ({
  state: initialState,
  // Actions to update the state here
}));

const addNode = (host, space, folder, node) =>
  set(
    produce((draft) => {
      const path = `${host}/${space}/${folder}`;
      draft.trove[path] = draft.trove[path] || {};
      draft.trove[path][node.id] = node;
    })
  );
// remove a node from a folder
const remNode = (host, space, folder, nodeId) =>
  set(
    produce((draft) => {
      const path = `${host}/${space}/${folder}`;
      if (draft.trove[path]) {
        delete draft.trove[path][nodeId];
      }
    })
  );
// edit a node in a folder
const editNode = (host, space, folder, nodeId, updates) =>
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
  );
const addModerators = (host, space, moderators) =>
  set(
    produce((draft) => {
      draft.moderators[`${host}/${space}`] = [
        ...draft.moderators,
        ...moderators,
      ];
    })
  );
const remModerators = (host, space, moderators) =>
  set(
    produce((draft) => {
      draft.moderators[`${host}/${space}`].filter(
        (moderator) => !moderators.includes(moderator)
      );
    })
  );

// update regulations for a given space and folder
const updateRegs = (host, space, folder, regulations) =>
  set(
    produce((draft) => {
      const key = `${host}/${space}/${folder}`;
      draft.regulations[key] = regulations;
    })
  );

const repeat = (fromSpace, fromFolder, fromFile, toSpace, toFolder, toFile) => {
  set((state) => {
    return produce(state, (draft) => {
      // Look up the source file and make a copy of it in the destination folder
      const from = draft.spaces[fromSpace][fromFolder][fromFile];
      draft.spaces[toSpace][toFolder][toFile] = { ...from };
    });
  });
};

const repermissions = (host, space, folder, permissions) => {
  set((state) => {
    return produce(state, (draft) => {
      // Update the permissions for the specified folder
      draft.spaces[host][space][folder].permissions = permissions;
    });
  });
};
