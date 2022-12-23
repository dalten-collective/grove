import _ from 'lodash';
import produce, { enableMapSet } from 'immer';
// import { GcpToken, BaseStorageState } from '@urbit/api';
import { GcpToken, BaseStorageState } from '@/types/storage';
import {
  createState,
  createSubscription,
  reduceStateN,
  BaseState,
} from '../base';
import api from '../../api';
import reduce from './reducer';

enableMapSet();

let numLoads = 0;

export type StorageState = BaseStorageState & BaseState<BaseStorageState>;

export const useStorage = createState<BaseStorageState>(
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
        const token = await api.thread<GcpToken>({
          inputMark: 'noun',
          outputMark: 'gcp-token',
          threadName: 'gcp-get-token',
          body: {},
        });
        get().set(
          produce((draft: any) => {
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
    (set, get) =>
      createSubscription('s3-store', '/all', (e) => {
        const data = _.get(e, 's3-update', false);
        if (data) {
          reduceStateN(get(), data, reduce);
        }
        numLoads += 1;
        if (numLoads === 2) {
          set({ loaded: true });
        }
      }),
  ]
);
