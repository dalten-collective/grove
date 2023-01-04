import React from 'react';
import { Box } from '@mui/material';
import { useLookupTable } from '../../state/store';
import { MainContainer, MainContentContainer, WindowContainer } from './styles';
const MainContentWindow = React.lazy(() => import('../MainContentWindow'));
const MenuBar = React.lazy(() => import('./MenuBar'));
const Sidebar = React.lazy(() => import('../Sidebar'));
const LocationBar = React.lazy(() => import('./LocationBar'));

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
