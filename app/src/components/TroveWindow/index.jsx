import React from 'react';
import { Box } from '@mui/material';
import { WindowContainer } from './WindowContainer';
import { TopBar } from './TopBar';
import { MainContainer } from './MainContainer';
import { LocationBar } from './LocationBar';
import { MainContentContainer } from './MainContent';
import { Sidebar } from '../Sidebar';
import { MainContentWindow } from '../MainContentWindow';
import { useStore, getShorthandHost, useLookupTable } from '../../state/store';

export default function TroveWindow() {
  const shorthandHost = useStore(getShorthandHost);
  useLookupTable();
  // TODO: Make this based off current trove; move to utils
  return (
    <Box>
      <WindowContainer>
        <TopBar appTitle="Trove" />
        <MainContainer>
          <LocationBar
            patP={shorthandHost || '~sampel-planet'}
            bucketText="Books"
          />
          <MainContentContainer>
            <Sidebar />
            <MainContentWindow />
          </MainContentContainer>
        </MainContainer>
      </WindowContainer>
    </Box>
  );
}
