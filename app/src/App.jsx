import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import TroveWindow from './components/TroveWindow/index';
import { useStore } from './state/store';
import { theme as baseTheme } from './theme/theme.jsx';
import { useTrove } from './urbit';

export const App = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { ship, scries, urbit } = useTrove();
  const { troves, troveState, getTroveState, setFullTroveState, getTroves } =
    useStore();

  useEffect(() => {
    if (ship && !isHydrated) {
      setIsHydrated(true);
      scries.state(urbit, setFullTroveState);
    }
  }, [ship]);

  useEffect(() => {
    const _troves = getTroves();
    const _troveState = getTroveState();
    console.log('troves: ', _troves);
    console.log('troveState: ', _troveState);
  }, [troves, troveState]);
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
