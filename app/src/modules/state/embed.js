import create from 'zustand';
import { jsonFetch } from '@/logic/utils';
const OEMBED_PROVIDER = 'https://noembed.com/embed';
const useEmbedState = create((set, get) => ({
    embeds: {},
    fetch: async (url, isMobile) => {
        const { embeds } = get();
        if (url in embeds) {
            return embeds[url];
        }
        const search = new URLSearchParams({
            maxwidth: isMobile ? '320' : '600',
            url,
        });
        const embed = await jsonFetch(`${OEMBED_PROVIDER}?${search.toString()}`);
        return embed;
    },
    getEmbed: async (url, isMobile) => {
        const { fetch, embeds } = get();
        if (url in embeds) {
            return embeds[url];
        }
        const { embeds: es } = get();
        const embed = await fetch(url, isMobile).catch((reason) => {
            throw reason;
        });
        set({ embeds: { ...es, [url]: embed } });
        return embed;
    },
}));
export default useEmbedState;
