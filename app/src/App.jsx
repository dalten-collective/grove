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
    hosts,
    getTroveState,
    setFullTroveState,
    getTroves,
    setHosts,
    getHosts,
  } = useStore();

  useEffect(() => {
    if (ship && !isHydrated) {
      setIsHydrated(true);
      scries.state(urbit, setFullTroveState);
      scries.hosts(urbit, setHosts);
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

// export const usePokeTest = () => {
//   const { urbit, ship, scries, pokes } = useTrove();
//   const { troves, troveState, getTroveState, setFullTroveState, getTroves } =
//     useStore();

//   useEffect(() => {
//     if (ship) {
//       pokes.test(urbit);
//     }
//   }, [ship]);
// };

// export const useAddFolderPokeTest = () => {
//   const { urbit, ship, scries, pokes } = useTrove();
//   const { troves, troveState, getTroveState, setFullTroveState, getTroves } =
//     useStore();

//   useEffect(() => {
//     if (ship) {
//       pokes.addFolder(urbit, 'our', 'test', ship);
//     }
//   }, [ship]);
// };
