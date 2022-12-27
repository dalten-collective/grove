import React, { Fragment } from 'react';
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiFolder2Line,
} from 'react-icons/ri';
import { useStore } from '../../../state/store.js';
import { getPathPills, getShipName } from '../../../utils/index.js';
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

export const LocationBar = () => {
  const selectedPath = useStore((state) => state.selectedPath);
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  const selectedHostSpace = useStore((state) => state.selectedHostSpace);
  const pathFrags = selectedPath ? selectedPath.slice().split('/') : [];

  const navigateToPillPath = (evt, pathName) => {
    evt.preventDefault();
    setSelectedPath(pathName);
  };
  const pathPills = getPathPills(pathFrags, selectedHostSpace);
  return (
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
        {pathPills?.length && (
          <ShipInfo
            onClick={(evt) => navigateToPillPath(evt, pathPills[0].path)}
          >
            <PatP>{pathPills[0]?.name}</PatP>
          </ShipInfo>
        )}
        <Slash>/</Slash>
        {pathPills?.length > 1 &&
          pathPills
            .slice(1)
            .map(({ name, path }) => (
              <PathPill
                key={path}
                name={name}
                path={path}
                navigateToPillPath={navigateToPillPath}
              />
            ))}
      </LocationInfo>
    </_LocationBar>
  );
};

export const PathPill = ({ name, path, navigateToPillPath }) =>
  name && path ? (
    <Fragment>
      <Bucket onClick={(evt) => navigateToPillPath(evt, path)}>
        <BucketText>{name}</BucketText>
      </Bucket>
      {path && <Slash>/</Slash>}
    </Fragment>
  ) : null;
