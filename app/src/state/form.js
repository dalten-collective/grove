import produce from 'immer';
import { createStore } from './storeMiddleware';

// TODO: Use lighter weight createStore for form state
export const useForm = createStore(
  (set, get) => ({
    formAction: 'add-folder',
    formData: {
      fromPath: '',
      toPath: '',
      name: '',
      description: '',
      permissions: '',
      url: '',
      extension: '',
      from: '',
      by: '',
      id: '',
    },
    skipInit: false,
    setSkipInit: (skip) =>
      set(
        produce((draft) => {
          draft.skipInit = skip;
        })
      ),

    setFormAction: (action) =>
      set(
        produce((draft) => {
          draft.formAction = action;
        })
      ),
    setFormData: (name, value) =>
      set(
        produce((draft) => {
          draft.formData[name] = value.toLowerCase();
        })
      ),
    hydrateFormData: (data) =>
      set(
        produce((draft) => {
          draft.formData = { ...draft.formData, ...data };
          draft.skipInit = true;
        })
      ),

    initFormData: (data) =>
      set(
        produce((draft) => {
          draft.formData = data;
        })
      ),
  }),
  'form'
);
