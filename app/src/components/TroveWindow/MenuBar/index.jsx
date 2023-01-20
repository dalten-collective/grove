import React from 'react';
import { RiMenu2Line, RiCloseLine } from 'react-icons/ri';
import {
  TopBarContainer,
  TopBarIcon,
  AppTitle,
  WindowCloseContainer,
} from './styles';

export default function MenuBar({ appTitle }) {
  return (
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
}
