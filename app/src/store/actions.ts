import { ActionTree, ActionContext, DispatchOptions } from 'vuex';
import { State } from './state';
import { Getters } from './getters';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

import * as T from '@/types';
import * as L from '@/types/loading-types';

import airlock from '@/api';
import { subscribeToS3 } from '@/api/settingsAPI';
import { scryState as tScryState } from '@/api/troveAPI';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.SCRY_STATE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;

  [ActionTypes.CONNECT_S3]({ commit }: AugmentedActionContext): void;

  [ActionTypes.CURRENT_SPACE_SET](
    { commit }: AugmentedActionContext,
    payload: T.Spat
  ): void;

  [ActionTypes.CURRENT_TRAIL_SET](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;

  [ActionTypes.EXAMPLE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;

  [ActionTypes.LOADING_STATE_RESET](
    { commit }: AugmentedActionContext,
    payload: L.UIElement
  ): void;
  [ActionTypes.INITIAL_SET](
    { commit }: AugmentedActionContext,
    payload: L.UIElement
  ): void;
  [ActionTypes.LOADING_SET](
    { commit }: AugmentedActionContext,
    payload: L.UIElement
  ): void;
  [ActionTypes.SUCCESS_SET](
    { commit }: AugmentedActionContext,
    payload: L.UIElement
  ): void;
  [ActionTypes.ERROR_SET](
    { commit }: AugmentedActionContext,
    payload: L.UIElement
  ): void;

  // Add more here.
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.CONNECT_S3](ctx) {
    subscribeToS3((subscriptionData) => {
      console.log('in action ', subscriptionData);
      if (
        's3-update' in subscriptionData &&
        'configuration' in subscriptionData['s3-update']
      ) {
        ctx.commit(
          MutationTypes.S3_CONFIG_SET,
          subscriptionData['s3-update'].configuration
        );
      }
    });
  },

  [ActionTypes.AIRLOCK_OPEN]({ commit, dispatch }, deskName: string) {
    airlock.openAirlockTo(
      deskName,

      // Main all-responses-handler
      (data: T.GallResponse) => {
        if (data.face === 'INITIAL_STATE') {
          commit(MutationTypes.TROVE_STATE_SET, data.fact);
        } else {
          // TODO: handle specific responses
          dispatch(ActionTypes.SCRY_STATE);
        }
        if (T.IsResponseOne(data)) {
          dispatch(ActionTypes.EXAMPLE, data.test.thing as string);
        }
        // if (T.IsResponseTwo(data)) {
        //   dispatch(ActionTypes.EXAMPLE, data.testTwo.thing as string);
        // }
      },

      (subscriptionNumber: number) => {
        // Thing to do on subscription callback, if anything
      }
    );
  },

  [ActionTypes.EXAMPLE]({ commit, getters }, payload: string) {
    console.log('dispatching EXAMPLE action...');
    console.log('getters ', getters); // Access to getters
    commit(MutationTypes.EXAMPLE, 'test');
  },

  [ActionTypes.SCRY_STATE]({ commit, getters }, payload: string) {
    tScryState().then((r) => {
      console.log('in action ', r);
      commit(MutationTypes.TROVE_STATE_SET, r.fact);
    });
  },

  [ActionTypes.CURRENT_SPACE_SET]({ commit, getters }, payload: T.Spat) {
    commit(MutationTypes.CURRENT_SPACE_SET, payload);
  },

  [ActionTypes.CURRENT_TRAIL_SET]({ commit, getters }, payload: string) {
    commit(MutationTypes.CURRENT_TRAIL_SET, payload);
  },

  [ActionTypes.INITIAL_SET]({ commit }, payload: L.UIElement) {
    const currentState: L.LoaderState = L.loaderStates.initial;
    commit(MutationTypes.LOADING_STATE_SET, {
      uiElement: payload,
      currentState,
    });
  },

  [ActionTypes.LOADING_SET]({ commit }, payload: L.UIElement) {
    const currentState: L.LoaderState = L.loaderStates.loading;
    commit(MutationTypes.LOADING_STATE_SET, {
      uiElement: payload,
      currentState,
    });
  },

  [ActionTypes.SUCCESS_SET]({ commit, dispatch }, payload: L.UIElement) {
    const currentState: L.LoaderState = L.loaderStates.success;
    commit(MutationTypes.LOADING_STATE_SET, {
      uiElement: payload,
      currentState,
    });
    dispatch(ActionTypes.LOADING_STATE_RESET, payload);
  },

  [ActionTypes.ERROR_SET]({ commit }, payload: L.UIElement) {
    const currentState: L.LoaderState = L.loaderStates.error;
    commit(MutationTypes.LOADING_STATE_SET, {
      uiElement: payload,
      currentState,
    });
  },

  [ActionTypes.LOADING_STATE_RESET](ctx, payload: L.UIElement) {
    setTimeout(() => {
      ctx.dispatch(ActionTypes.INITIAL_SET, payload);
    }, 3000);
  },

  // Add more here
};
