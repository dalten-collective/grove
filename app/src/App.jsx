import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import TroveWindow from './components/TroveWindow/index';
import { useStore } from './state/store';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove, useTroveSubscription } from './urbit';
// import { useAirlock } from './urbit/auth';
// import { addTilde } from './utils';

export const App = () => {
  // useAirlock();
  useTroveSubscription();
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
  // usePoke(...addFolderArgs);
  // usePoke(...remFolderArgs);

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
