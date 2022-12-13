import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

import TroveWindow from './components/TroveWindow/index';
import { GlobalStyle } from './theme/App.styles';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';

export const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [] = useTrove();

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
