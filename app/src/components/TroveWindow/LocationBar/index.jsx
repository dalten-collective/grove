import React from 'react';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import {
  ArrowNav,
  Bucket,
  BucketText,
  LeftArrow,
  LocationBar as _LocationBar,
  LocationInfo,
  PatP,
  RightArrow,
  ShipInfo,
  Slash,
} from './LocationBar.jsx';

export const LocationBar = ({
  patP = '~doplyr-harbur',
  bucketText = 'Books',
}) => (
  <_LocationBar>
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
        <PatP>{patP}</PatP>
      </ShipInfo>
      <Slash>/</Slash>
      <Bucket>
        <BucketText>{bucketText}</BucketText>
      </Bucket>
    </LocationInfo>
  </_LocationBar>
);
