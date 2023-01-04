import api from './api';
// import useContactState from 'landscape-apps/dist/src/state/contact';
// import { useGroupState } from 'landscape-apps/dist/src/state/groups';
// import useHarkState from 'landscape-apps/dist/src/state/hark';
// import { useHeapState } from 'landscape-apps/dist/src/state/heap/heap';
import { useSettingsState } from './state/useSettingsState';
import { useStorage } from './state/useStorage';

export default function bootstrap() {
  // useGroupState.getState().start();

  // useHeapState.getState().start();
  // useHarkState.getState().start();
  // useContactState.getState().initialize(api);
  const { initialize: settingsInitialize, fetchAll } =
    useSettingsState.getState();
  settingsInitialize(api);
  // fetchAll();
  useStorage.getState().initialize(api);
}
