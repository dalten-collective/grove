import produce from 'immer';
import { createStore } from './storeMiddleware';

// TODO: Use lighter weight createStore for form state
export const useForm = createStore(
  (set, get) => ({
    formAction: '',
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
    initFormData: (data) =>
      set(
        produce((draft) => {
          draft.formData = data;
        })
      ),
  }),
  'form'
);
