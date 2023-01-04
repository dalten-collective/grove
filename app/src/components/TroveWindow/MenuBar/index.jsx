import React from 'react';
import { RiMenu2Line, RiCloseLine } from 'react-icons/ri';
import {
  TopBarContainer,
  TopBarIcon,
  AppTitle,
  WindowCloseContainer,
} from './styles';

export const MenuBar = ({ appTitle }) => (
  <TopBarContainer>
    <TopBarIcon>
      {/* <IconVector> */}
      <RiMenu2Line />
      {/* </IconVector> */}
    </TopBarIcon>
    <AppTitle>{appTitle}</AppTitle>
    <WindowCloseContainer>
      <RiCloseLine />
    </WindowCloseContainer>
  </TopBarContainer>
);
