import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import * as T from "@/types";
import * as L from "@/loading-types";
import { sigShip } from "@/helpers"

export type Mutations<S = State> = {
  [MutationTypes.EXAMPLE](
    state: S,
    payload: string
  ): void;

  [MutationTypes.S3_CONFIG_SET](
    state: S,
    payload: {},
  ): void;

  [MutationTypes.CURRENT_SPACE_SET](
    state: S,
    payload: T.Spat
  ): void;

  [MutationTypes.CURRENT_TRAIL_SET](
    state: S,
    payload: string
  ): void;

  [MutationTypes.CURRENT_TREE_SET](
    state: S,
    payload: object
  ): void;
  [MutationTypes.CURRENT_TREE_CONFIG_SET](
    state: S,
    payload: object
  ): void;

  [MutationTypes.LOADING_STATE_SET](
    state: S,
    payload: { uiElement: L.UIElement, currentState: L.LoaderState }
  ): void;

  [MutationTypes.TROVE_STATE_SET](
    state: S,
    payload
  ): void;

  // Add more here
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.EXAMPLE](
    state,
    payload: string
  ) {
    // update state
    // state.somethign = payload
  },

  [MutationTypes.S3_CONFIG_SET](
    state,
    payload: {}
  ) {
    state.s3Config = payload;
  },

  [MutationTypes.CURRENT_SPACE_SET](
    state,
    payload: T.Spat
  ) {
    state.currentSpace = payload;
  },

  [MutationTypes.CURRENT_TRAIL_SET](
    state,
    payload: string
  ) {
    state.currentTrail = payload;
  },

  [MutationTypes.CURRENT_TREE_SET](
    state,
    payload: object
  ) {
    state.currentTree = payload;
  },
  [MutationTypes.CURRENT_TREE_CONFIG_SET](
    state,
    payload: object
  ) {
    state.currentTreeConfig = payload;
  },

  [MutationTypes.LOADING_STATE_SET](
    state,
    payload: { uiElement: L.UIElement, currentState: L.LoaderState }
  ) {
    state.loadingStates[payload.uiElement] = payload.currentState
  },

  [MutationTypes.TROVE_STATE_SET](
    state,
    payload
  ) {
    state.troves = payload.troves
  },

  // Add more here
};
