import create from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import pipe from 'ramda/es/pipe';

// import bootstrap from '../lib/bootstrap';
// import bootstrap from '../modules/state/bootstrap';

const logger = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('====================================');
      // console.log('  applying', args);
      set(args);

      console.log('selectedPath', get().selectedPath);
      console.log('selectedHostSpace', get().selectedHostSpace);
      console.log('troves', get().troves);
      console.log('lookupTable', get().lookupTable);

      console.log('====================================');
    },
    get,
    api
  );

export const createStore = pipe(
  // logger,
  devtools,
  subscribeWithSelector,
  persist,
  immer,
  create
);

// export const storageSlice = bootstrap;
