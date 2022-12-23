import Urbit from '@urbit/http-api';
import { useLocalState } from './state/local';
import useSubscriptionState from './state/subscription';
// export const IS_MOCK =
//   import.meta.env.MODE === 'mock' || import.meta.env.MODE === 'staging';
// const URL = (import.meta.env.VITE_MOCK_URL ||
//   import.meta.env.VITE_VERCEL_URL) as string;
let client = undefined;
const { errorCount, airLockErrorCount } = useLocalState.getState();
async function setupAPI() {
    // if (IS_MOCK) {
    //   window.ship = 'finned-palmer';
    //   window.our = `~${window.ship}`;
    //   window.desk = 'groups';
    //   const MockUrbit = (await import('@tloncorp/mock-http-api')).default;
    //   const mockHandlers = (await import('./mocks/handlers')).default;
    //   if (!client) {
    //     const api = new MockUrbit(mockHandlers, URL || '', '');
    //     api.ship = window.ship;
    //     api.verbose = true;
    //     client = api;
    //   }
    //   return;
    // }
    if (!client) {
        const api = new Urbit('', '', window.desk);
        api.ship = window.ship;
        // api.verbose = import.meta.env.DEV;
        client = api;
    }
    client.onError = () => {
        (async () => {
            useLocalState.setState({ airLockErrorCount: airLockErrorCount + 1 });
            useLocalState.setState({ subscription: 'reconnecting' });
        })();
    };
}
const api = {
    async scry(params) {
        if (!client) {
            await setupAPI();
        }
        return client.scry(params);
    },
    async poke(params) {
        try {
            if (!client) {
                await setupAPI();
            }
            const clientPoke = await client.poke(params);
            useLocalState.setState({ subscription: 'connected' });
            useLocalState.setState({ errorCount: 0 });
            return clientPoke;
        }
        catch (e) {
            useLocalState.setState({ errorCount: errorCount + 1 });
            throw e;
        }
    },
    async subscribe(params) {
        const eventListener = (listener) => (event, mark) => {
            const { watchers, remove } = useSubscriptionState.getState();
            const path = params.app + params.path;
            const relevantWatchers = watchers[path];
            if (relevantWatchers) {
                relevantWatchers.forEach((w) => {
                    if (w.hook(event, mark)) {
                        w.resolve();
                        remove(path, w.id);
                    }
                });
            }
            if (listener) {
                listener(event, mark);
            }
        };
        try {
            if (!client) {
                await setupAPI();
            }
            const clientSubscribe = await client.subscribe({
                ...params,
                event: eventListener(params.event),
            });
            useLocalState.setState({ subscription: 'connected' });
            useLocalState.setState({ errorCount: 0 });
            return clientSubscribe;
        }
        catch (e) {
            useLocalState.setState({ errorCount: errorCount + 1 });
            throw e;
        }
    },
    async subscribeOnce(app, path, timeout) {
        try {
            if (!client) {
                await setupAPI();
            }
            const clientPoke = await client.subscribeOnce(app, path, timeout);
            useLocalState.setState({ subscription: 'connected' });
            useLocalState.setState({ errorCount: 0 });
            return clientPoke;
        }
        catch (e) {
            useLocalState.setState({ errorCount: errorCount + 1 });
            throw e;
        }
    },
    async thread(params) {
        try {
            if (!client) {
                await setupAPI();
            }
            const clientThread = await client.thread(params);
            useLocalState.setState({ subscription: 'connected' });
            useLocalState.setState({ errorCount: 0 });
            return clientThread;
        }
        catch (e) {
            useLocalState.setState({ errorCount: errorCount + 1 });
            throw e;
        }
    },
    async unsubscribe(id) {
        try {
            if (!client) {
                await setupAPI();
            }
            const clientUnsubscribe = await client.unsubscribe(id);
            useLocalState.setState({ subscription: 'connected' });
            useLocalState.setState({ errorCount: 0 });
            return clientUnsubscribe;
        }
        catch (e) {
            useLocalState.setState({ errorCount: errorCount + 1 });
            throw e;
        }
    },
};
export default api;
