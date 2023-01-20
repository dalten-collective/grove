import { S3Client } from '@aws-sdk/client-s3';
import create from 'zustand';
import produce from 'immer';
// import { devtools } from 'zustand/middleware';
// import pipe from 'ramda/es/pipe';
import { createStore } from './middleware';
import { prefixEndpoint } from './storage/util';

const useFileStore = createStore((set) => ({
  // const useFileStore = create((set) => ({
  client: null,
  status: 'initial',
  files: {},
  createClient: (credentials) => {
    const endpoint = new URL(prefixEndpoint(credentials.endpoint));
    const client = new S3Client({
      endpoint: {
        protocol: endpoint.protocol, // .slice(0, -1), why was this here?
        hostname: endpoint.host,
        path: endpoint.pathname || '/',
      },
      // this region is necessary for compatibility with other S3 providers (i.e., filebase)
      region: 'us-east-1',
      credentials,
      forcePathStyle: true,
    });
    set({ client });
  },
  setStatus: (status) =>
    set(
      produce((draft) => {
        draft.status = status;
      })
    ),
  setFiles: (file) =>
    set(
      produce((draft) => {
        draft.files[file.key] = file;
      })
    ),
  setFileStatus: (file) =>
    set(
      produce((draft) => {
        const [key, status] = file;
        draft.files[key].status = status;
      })
    ),
  setErrorMessage: (file) =>
    set(
      produce((draft) => {
        const [key, errorMessage] = file;
        draft.files[key].errorMessage = errorMessage;
      })
    ),
  setFileURL: (file) =>
    set(
      produce((draft) => {
        const [key, url] = file;
        console.log('setFileURL', key, url);
        draft.files[key].url = url;
      })
    ),
  clearFiles: () =>
    set(
      produce((draft) => {
        debugger;
        draft.files = {};
      })
    ),
  removeFileByURL: (i) =>
    set(
      produce((draft) => {
        debugger;
        draft.files = Object.fromEntries(
          Object.entries(draft.files).filter(([_k, f]) => f.url !== i.image.src)
        );
      })
    ),
}));

export default useFileStore;
