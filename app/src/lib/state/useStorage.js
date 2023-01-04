import getLd from 'lodash/get';
import produce, { enableMapSet } from 'immer';

import { createState, createSubscription, reduceStateN } from './base';
import api from '../api';
import reduce from './storage/reducer';

// TODO: Remove this effectful code
enableMapSet();

let numLoads = 0;

export const useStorage = createState(
  'Storage',
  (set, get) => ({
    loaded: false,
    hasCredentials: false,
    gcp: {
      isConfigured: () =>
        api.thread({
          inputMark: 'noun',
          outputMark: 'json',
          threadName: 'gcp-is-configured',
          body: {},
        }),
      getToken: async () => {
        const token = await api.thread({
          inputMark: 'noun',
          outputMark: 'gcp-token',
          threadName: 'gcp-get-token',
          body: {},
        });
        get().set(
          produce((draft) => {
            draft.gcp.token = token;
          })
        );
      },
    },
    s3: {
      configuration: {
        buckets: new Set(),
        currentBucket: '',
      },
      credentials: null,
    },
  }),
  [],
  [
    (set, getState) =>
      createSubscription('s3-store', '/all', (e) => {
        const data = getLd(e, 's3-update', false);
        if (data) {
          reduceStateN(getState(), data, reduce);
        }
        numLoads += 1;
        if (numLoads === 2) {
          set({ loaded: true });
        }
      }),
  ]
);
