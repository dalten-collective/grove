import React from 'react';
import { Box } from '@mui/material';
import { useLookupTable } from '../../state/store';
import { Sidebar } from '../Sidebar';
import { LocationBar } from './LocationBar';
import { MenuBar } from './MenuBar';
import { MainContentWindow } from '../MainContentWindow';
import { MainContainer, MainContentContainer, WindowContainer } from './styles';

export default function TroveWindow() {
  useLookupTable();
  return (
    <Box sx={{ height: '100%' }}>
      <WindowContainer>
        <MenuBar appTitle="Trove" />
        <MainContainer>
          <LocationBar />
          <MainContentContainer>
            <Sidebar />
            <MainContentWindow />
          </MainContentContainer>
        </MainContainer>
      </WindowContainer>
    </Box>
  );
}
