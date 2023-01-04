import get from 'lodash/get';

const credentials = (json, state) => {
  const data = get(json, 'credentials', false);
  if (data) {
    state.s3.credentials = data;
  }
  return state;
};
const configuration = (json, state) => {
  const data = get(json, 'configuration', false);
  if (data) {
    state.s3.configuration = {
      buckets: new Set(data.buckets),
      currentBucket: data.currentBucket,
    };
  }
  return state;
};
const currentBucket = (json, state) => {
  const data = get(json, 'setCurrentBucket', false);
  if (data && state.s3) {
    state.s3.configuration.currentBucket = data;
  }
  return state;
};
const addBucket = (json, state) => {
  const data = get(json, 'addBucket', false);
  if (data) {
    state.s3.configuration.buckets = state.s3.configuration.buckets.add(data);
  }
  return state;
};
const removeBucket = (json, state) => {
  const data = get(json, 'removeBucket', false);
  if (data) {
    state.s3.configuration.buckets.delete(data);
  }
  return state;
};
const endpoint = (json, state) => {
  const data = get(json, 'setEndpoint', false);
  if (data && state.s3.credentials) {
    state.s3.credentials.endpoint = data;
  }
  return state;
};
const accessKeyId = (json, state) => {
  const data = get(json, 'setAccessKeyId', false);
  if (data && state.s3.credentials) {
    state.s3.credentials.accessKeyId = data;
  }
  return state;
};
const secretAccessKey = (json, state) => {
  const data = get(json, 'setSecretAccessKey', false);
  if (data && state.s3.credentials) {
    state.s3.credentials.secretAccessKey = data;
  }
  return state;
};

const reduce = [
  credentials,
  configuration,
  currentBucket,
  addBucket,
  removeBucket,
  endpoint,
  accessKeyId,
  secretAccessKey,
];

export default reduce;
