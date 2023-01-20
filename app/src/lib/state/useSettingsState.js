import { putEntry as doPutEntry, getDeskSettings } from '@urbit/api';
import _ from 'lodash';

import { lsDesk } from '../constants';
import {
  createState,
  createSubscription,
  pokeOptimisticallyN,
  reduceStateN,
} from './base';
import api from '../api';

const ALPHABETICAL = 'A → Z';
const DEFAULT = 'Arranged';
const RECENT = 'Recent';

export const filters = {
  dms: 'Direct Messages',
  all: 'All Messages',
  groups: 'Group Channels',
};
function putBucket(json, draft) {
  const data = _.get(json, 'put-bucket', false);
  if (data) {
    draft[data['bucket-key']] = data.bucket;
  }
  return draft;
}
function delBucket(json, draft) {
  const data = _.get(json, 'del-bucket', false);
  if (data) {
    delete draft[data['bucket-key']];
  }
  return draft;
}
function putEntry(json, draft) {
  const data = _.get(json, 'put-entry', false);
  if (data) {
    if (!draft[data['bucket-key']]) {
      draft[data['bucket-key']] = {};
    }
    draft[data['bucket-key']][data['entry-key']] = data.value;
  }
  debugger;
  return draft;
}
function delEntry(json, draft) {
  const data = _.get(json, 'del-entry', false);
  if (data) {
    delete draft[data['bucket-key']][data['entry-key']];
  }
  return draft;
}
export const reduceUpdate = [putBucket, delBucket, putEntry, delEntry];
export const useSettingsState = createState(
  'Settings',
  (set, get) => ({
    display: {
      theme: 'auto',
    },
    calmEngine: {
      disableAppTileUnreads: false,
      disableAvatars: false,
      disableRemoteContent: false,
      disableSpellcheck: false,
      disableNicknames: false,
    },
    heaps: {
      heapSettings: '',
    },
    diary: {
      settings: '',
    },
    groups: {
      orderedGroupPins: [],
      sideBarSort: DEFAULT,
      groupSideBarSort: '{"~": "A → Z"}',
    },
    talk: {
      messagesFilter: filters.dms,
    },
    loaded: false,
    putEntry: async (bucket, key, val) => {
      const poke = doPutEntry(window.desk, bucket, key, val);
      await pokeOptimisticallyN(useSettingsState, poke, reduceUpdate);
    },
    fetchAll: async () => {
      const grResult = (await api.scry(getDeskSettings(window.desk))).desk;
      const lsResult = (await api.scry(getDeskSettings(lsDesk))).desk;
      const newState = {
        ..._.mergeWith(get(), grResult, lsResult, (obj, src) =>
          _.isArray(src) ? src : undefined
        ),
        loaded: true,
      };
      set(newState);
    },
  }),
  ['display', 'heaps', 'diary', 'groups', 'talk'],
  [
    (set, get) =>
      createSubscription('settings-store', `/desk/${window.desk}`, (e) => {
        const data = _.get(e, 'settings-event', false);
        if (data) {
          reduceStateN(get(), data, reduceUpdate);
          set({ loaded: true });
        }
      }),
    (set, get) =>
      createSubscription('settings-store', `/desk/${lsDesk}`, (e) => {
        const data = _.get(e, 'settings-event', false);
        if (data) {
          reduceStateN(get(), data, reduceUpdate);
          set({ loaded: true });
        }
      }),
  ]
);
const selTheme = (s) => s.display.theme;
export function useTheme() {
  return useSettingsState(selTheme);
}
const selCalm = (s) => s.calmEngine;
export function useCalm() {
  return useSettingsState(selCalm);
}
export function parseSettings(settings) {
  return settings !== '' ? JSON.parse(settings) : [];
}
export function getSetting(settings, flag) {
  return settings.find((el) => el.flag === flag);
}
export function setSetting(settings, newSetting, flag) {
  const oldSettings = settings.slice(0);
  const oldSettingIndex = oldSettings.findIndex((s) => s.flag === flag);
  const setting = {
    ...oldSettings[oldSettingIndex],
    flag,
    ...newSetting,
  };
  if (oldSettingIndex >= 0) {
    oldSettings.splice(oldSettingIndex, 1);
  }
  return [...oldSettings, setting];
}
const selHeapSettings = (s) => s.heaps.heapSettings;
export function useHeapSettings() {
  const settings = useSettingsState(selHeapSettings);
  return parseSettings(settings ?? '');
}
export function useHeapSortMode(flag) {
  const settings = useHeapSettings();
  const heapSetting = getSetting(settings, flag);
  return heapSetting?.sortMode ?? 'time';
}
export function useHeapDisplayMode(flag) {
  const settings = useHeapSettings();
  const heapSetting = getSetting(settings, flag);
  return heapSetting?.displayMode ?? 'grid';
}
const selDiarySettings = (s) => s.diary.settings;
export function useDiarySettings() {
  const settings = useSettingsState(selDiarySettings);
  return parseSettings(settings ?? '');
}
export function useDiarySortMode(flag) {
  const settings = useDiarySettings();
  const heapSetting = getSetting(settings, flag);
  return heapSetting?.sortMode ?? 'time-dsc';
}
export function useDiaryCommentSortMode(flag) {
  const settings = useDiarySettings();
  const setting = getSetting(settings, flag);
  return setting?.commentSortMode ?? 'dsc';
}
const selGroupSideBarSort = (s) => s.groups.groupSideBarSort;
export function useGroupSideBarSort() {
  const settings = useSettingsState(selGroupSideBarSort);
  return JSON.parse(settings ?? '{"~": "A → Z"}');
}
