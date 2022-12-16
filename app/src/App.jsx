import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import TroveWindow from './components/TroveWindow/index';
import { useStore } from './state/store';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';

export const App = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { urbit, ship, scries } = useTrove();
  const {
    troves,
    troveState,
    tree,
    hosts,
    getTroveState,
    setFullTroveState,
    getTroves,
    setHosts,
    getHosts,
    setTree,
    fetchTree,
  } = useStore();

  useEffect(() => {
    if (ship && !isHydrated) {
      setIsHydrated(true);
      scries.state(urbit, setFullTroveState);
      scries.hosts(urbit, setHosts);
      scries.team(urbit);

      // NOTE: There are two ways to scry and update store state.
      // 1. Use an async scry function from the store, such as `fetchTree`, which can update store state itself.
      // 2. Pass a store-updating callback to the scry helper function we get from the `scries` object on `useTrove`.

      scries.tree(urbit, {
        handler: setTree,
        args: { host: ship, space: 'our' },
      });
      fetchTree(urbit, { host: ship, space: 'our' });
    }
  }, [ship]);

  useEffect(() => {
    const _troves = getTroves();
    const _troveState = getTroveState();
    const _hosts = getHosts();
    console.log('troves: ', _troves);
    console.log('troveState: ', _troveState);
    console.log('hosts: ', _hosts);
  }, [troves, troveState, hosts]);

  // Poke working here
  // useAddFolderPokeTest();

  return (
    // <CoreProvider value={coreStore}>
    <>
      <ThemeProvider theme={baseTheme['dark']}>
        <TroveWindow />
        <div id="portal-root" />
      </ThemeProvider>
    </>
  );
};

export const useAddFolderPokeTest = () => {
  const { getHosts, hosts } = useStore();
  const { urbit, ship, pokes } = useTrove();
  const _hosts = getHosts();
  useEffect(() => {
    const testPoke = async () => {
      pokes.folder.add(
        urbit,
        'our',
        { toPath: '/', name: 'test-folder-yoo/chicken', permissions: null },
        ship
      );
    };
    if (ship && _hosts?.length) {
      testPoke();
    }
  }, [ship, hosts]);
};
