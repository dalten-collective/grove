import create from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import pipe from 'ramda/es/pipe';

// import bootstrap from '../modules/state/bootstrap';

const logger = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('====================================');
      // console.log('  applying', args);
      set(args);
      console.log('  new state troves', get().troves);
      // console.log('  new state lookupTable', get().lookupTable);
      // console.log('NEW STATE');
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
