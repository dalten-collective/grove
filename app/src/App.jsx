import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MotionConfig } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';

import { useStore } from './state/store';
import { useSwitchSpaceOnSearch } from './state/hooks';
import { useTrove, useTroveSubscription } from './urbit';
import { useAirlock } from './urbit/auth';
import { defaultTheme, GlobalStyle } from './theme/App.styles';
import { theme as baseTheme } from './theme/theme.jsx';
// import { addTilde } from './utils';
import TroveWindow from './components/TroveWindow/index';
// const TroveWindow = React.lazy(() => import('./components/TroveWindow/index'));

// let appUrl = `${ship.url}/apps/${window.id}/?spaceId=${spaces.selected?.path}`;
// selectSpace
// spaceId=/~wolred-salnel/troveish

export const RouterWrappedApp = ({ state, location, isMobile, isSmall }) => {
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </>
  );
};
export const App = (props) => {
  // useAirlock();
  useTroveSubscription();
  useSwitchSpaceOnSearch();
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

  // const state = location.state;

  return (
    <>
      <ThemeProvider theme={baseTheme['light']}>
        <GlobalStyle blur={true} realmTheme={defaultTheme.themes.default} />
        <MotionConfig transition={{ duration: 1, reducedMotion: 'user' }}>
          <TroveWindow />
          <div id="portal-root" />
        </MotionConfig>
      </ThemeProvider>
    </>
  );
};

// TODO: Extract currently unused preview state reset logic
// const resetPreviewState = useStore((state) => state.resetPreviewState);

// Reset (perseistent) preview state on unmount
// useLayoutEffect(() => {
//   return () => {
//     resetPreviewState();
//   };
// }, []);
