import React from 'react';
// import Svg from '@holium/design-system/src/components/Icons/more';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { WindowContainer } from './WindowContainer';
import { TopBar } from './TopBar';
import { MainContainer } from './MainContainer';
import {
  ArrowNav,
  Bucket,
  BucketText,
  LeftArrow,
  LocationBar,
  LocationInfo,
  PatP,
  RightArrow,
  ShipInfo,
  Slash,
} from './LocationBar.jsx';
import { MainContentContainer } from './MainContent';

import { Sidebar } from '../Sidebar';
import { MainContentWindow } from '../MainContentWindow';

export default function TroveWindow() {
  return (
    <WindowContainer>
      <TopBar appTitle="Trove" />
      <MainContainer>
        <LocationBar>
          <ArrowNav>
            <LeftArrow>
              <RiArrowLeftSLine />
            </LeftArrow>
            <RightArrow>
              <RiArrowRightSLine />
            </RightArrow>
          </ArrowNav>
          <LocationInfo>
            <ShipInfo>
              <PatP>~doplyr-harbur</PatP>
            </ShipInfo>
            <Slash>/</Slash>
            <Bucket>
              <BucketText>Books</BucketText>
            </Bucket>
          </LocationInfo>
        </LocationBar>
        <MainContentContainer>
          <Sidebar />
          <MainContentWindow />
        </MainContentContainer>
      </MainContainer>
    </WindowContainer>
  );
}
