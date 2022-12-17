import React from 'react';
// import Svg from '@holium/design-system/src/components/Icons/more';
import { WindowContainer } from './WindowContainer';
import { TopBar } from './TopBar';
import { MainContainer } from './MainContainer';
import { LocationBar } from './LocationBar';
import { MainContentContainer } from './MainContent';

import { Sidebar } from '../Sidebar';
import { MainContentWindow } from '../MainContentWindow';
import { useTrove } from '../../urbit';
import { addTilde } from '../../utils';

export default function TroveWindow() {
  const { ship } = useTrove();
  // TODO: Make this based off current trove; move to utils
  const getShipName = (_ship) => {
    if (_ship && _ship.length > 2) {
      const names = _ship?.slice().split('-');
      return names.length > 2
        ? `~${names[0]}-${names[names.length - 1]}`
        : `~${_ship}`;
    }
  };
  return (
    <WindowContainer>
      <TopBar appTitle="Trove" />
      <MainContainer>
        <LocationBar
          patP={getShipName(ship) || '~doplyr-harbur'}
          bucketText="Books"
        />
        <MainContentContainer>
          <Sidebar />
          <MainContentWindow />
        </MainContentContainer>
      </MainContainer>
    </WindowContainer>
  );
}
