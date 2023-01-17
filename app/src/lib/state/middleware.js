import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import pipe from 'ramda/es/pipe';

const logger = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('====================================');
      // console.log('  applying', args);
      set(args);
      console.log('====================================');
      console.log('state: ', get());
      console.log('====================================');
      console.log('====================================');
    },
    get,
    api
  );

export const createStore = pipe(
  // logger,
  devtools,
  // persist,
  immer,
  create
);

export const createStoreWithPersist = pipe(
  // logger,
  devtools,
  persist,
  immer,
  create
);
