import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import produce from 'immer';

import { pokes } from '../urbit/pokes';
import { scries } from '../urbit/scries';

export const useStore = create(
  devtools(
    immer((set, get) => ({
      // ...initialState,
      moderators: {},
      regulations: {},
      trove: {},

      pokes,

      // TODO: Handle scry responses
      scries,
      // Actions to update the store here
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
