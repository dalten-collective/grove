import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import TroveWindow from './components/TroveWindow/index';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { ship, scries, urbit } = useTrove();

  useEffect(() => {
    if (ship && !isAuthenticated) {
      setIsAuthenticated(true);
      scries.hosts(urbit);
    }
  }, [ship]);

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
