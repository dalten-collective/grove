import produce from 'immer';
import { createStore } from 'zustand';

const [useTroveStore, troveStoreApi] = createStore((set) => ({
  // retrieve current state
  getState: () => set((state) => state),
  // update moderators for a given space
  addModerators: (host, space, moderators) =>
    set(
      produce((draft) => {
        draft.moderators[`${host}/${space}`].push(...moderators);
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
  // update regulations for a given space and folder
  updateRegulations: (host, space, folder, regulations) =>
    set(
      produce((draft) => {
        const key = `${host}/${space}/${folder}`;
        draft.regulations[key] = regulations;
      })
    ),
  // add a node (file or folder) to a folder
  addNode: (host, space, folder, node) =>
    set(
      produce((draft) => {
        const path = `${host}/${space}/${folder}`;
        draft.trove[path] = draft.trove[path] || {};
        draft.trove[path][node.id] = node;
      })
    ),
  // remove a node from a folder
  removeNode: (host, space, folder, nodeId) =>
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
}));
