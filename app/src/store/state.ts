import * as T from "@/types";
import * as L from "@/types/loading-types";

import { loaderStates } from "@/types/loading-types";

const uiElementLoadingState: L.UILoaderState = {
  yourElementHere: loaderStates.initial,
  anotherElement: loaderStates.initial,
  s3UploadButton: loaderStates.initial,
  s3UploadProgress: loaderStates.initial,
}

export const state = {
  exampleThings: [] as Array<T.Thing>,
  loadingStates: uiElementLoadingState as L.UILoaderState,
  groves: [],
  currentSpace: '' as T.Spat,
  currentTrail: '/',
  currentTree: {},
  currentTreeConfig: {},
  s3Config: { currentBucket: '', buckets: [], region: '' },
  s3Credentials: { endpoint: '', accessKeyId: '', secretAccessKey: '' },
}

export type State = typeof state
