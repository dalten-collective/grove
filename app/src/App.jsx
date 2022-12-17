import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import TroveWindow from './components/TroveWindow/index';
import { useStore } from './state/store';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';
// import { addTilde } from './utils';

export const App = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { urbit, ship, scries } = useTrove();
  const hosts = useStore((state) => state.hosts);

  useEffect(() => {
    if (ship && !isHydrated) {
      setIsHydrated(true);
      scries.hosts(urbit);
    }
    if (ship && !isEmpty(hosts)) scries.allTrees(urbit);
    // scries.tree(urbit, { host: addTilde(ship), space: 'our' });
  }, [ship, hosts]);

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
