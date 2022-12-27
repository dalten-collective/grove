import create from 'zustand';
import { init } from 'emoji-mart';
const useEmoji = create((set, get) => ({
    data: {},
    load: async () => {
        if (Object.keys(get().data).length > 0) {
            return;
        }
        const data = (await import('@emoji-mart/data')).default;
        set({ data });
        init({ data });
    },
}));
export default useEmoji;
