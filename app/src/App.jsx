import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import TroveWindow from './components/TroveWindow/index';
import { useStore } from './state/store';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';
import { addTilde } from './utils';

export const App = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { urbit, ship, scries } = useTrove();
  const {
    troves,
    troveState,
    tree,
    hosts,
    getTroveState,
    getTroves,
    getHosts,
    getTree,
  } = useStore();

  useEffect(() => {
    if (ship && !isHydrated) {
      setIsHydrated(true);
      scries.troveState(urbit);
      scries.tree(urbit, { host: addTilde(ship), space: 'our' });
      scries.hosts(urbit);
    }
  }, [ship]);

  useEffect(() => {
    const _troves = getTroves();
    const _troveState = getTroveState();
    const _tree = getTree();
    const _hosts = getHosts();
    console.log('troves: ', _troves);
    console.log('troveState: ', _troveState);
    console.log('tree: ', _tree);
    console.log('hosts: ', _hosts);
  }, [troves, troveState, hosts, tree]);

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
