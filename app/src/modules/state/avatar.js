import produce from 'immer';
import { useCallback } from 'react';
import create from 'zustand';
const useAvatarStore = create((set, get) => ({
    status: {},
    loaded: (src) => {
        set(produce((draft) => {
            draft.status[src] = true;
        }));
    },
}));
export function useAvatar(src) {
    return useAvatarStore(useCallback((store) => ({
        hasLoaded: store.status[src] || false,
        load: () => store.loaded(src),
    }), [src]));
}
export default useAvatarStore;
