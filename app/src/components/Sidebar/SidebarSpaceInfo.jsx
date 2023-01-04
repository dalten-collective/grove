import React, { useState } from 'react';
import {
  RiArrowDownSLine,
  RiAddLine,
  RiUser3Line,
  RiSettings3Line,
} from 'react-icons/ri';
// import Avatar from '@mui/material/Avatar';
import Avatar from 'landscape-apps/dist/src/components/Avatar';
import { useStore } from '../../state/store';
import { getShipName } from '../../utils';
import {
  SpaceInfoContainer,
  SpaceInfoCard,
  InnerSpaceInfoCard,
  SpaceInfoCardElements,
  SpaceImage,
  SpaceName,
  SpaceNameSmall,
  SpaceNameSmallText,
  SpaceNameBigText,
  SpaceInfoToolbar,
  SpaceInfoInnerToolbar,
  FolderPlusContainer,
  ToolbarIconContainer,
  ToolbarPeopleContainer,
  ToolbarSettingsContainer,
} from './styles';

export const SpaceInfo = ({ toggleAddFolder, toggleUploadFile }) => {
  const selectedPath = useStore((state) => state.selectedPath);
  const [_host, space] = selectedPath?.slice().split('/');
  const host = getShipName(_host);
  return (
    <SpaceInfoContainer>
      <SpaceInfoCard>
        <InnerSpaceInfoCard>
          <SpaceInfoCardElements>
            <SpaceImage>
              <Avatar ship="~doplyr-harbur" />
            </SpaceImage>
            <SpaceName>
              <SpaceNameSmall>
                <SpaceNameSmallText>Group</SpaceNameSmallText>
              </SpaceNameSmall>
              <SpaceNameBigText>
                {host}/{space}
              </SpaceNameBigText>
            </SpaceName>
          </SpaceInfoCardElements>
        </InnerSpaceInfoCard>
      </SpaceInfoCard>
      <SpaceInfoToolbar>
        <SpaceInfoInnerToolbar>
          <FolderPlusContainer onClick={toggleUploadFile}>
            <RiAddLine />
          </FolderPlusContainer>
          <ToolbarIconContainer>
            <ToolbarPeopleContainer>
              <RiUser3Line />
            </ToolbarPeopleContainer>
            <ToolbarSettingsContainer>
              <RiSettings3Line />
            </ToolbarSettingsContainer>
          </ToolbarIconContainer>
        </SpaceInfoInnerToolbar>
      </SpaceInfoToolbar>
    </SpaceInfoContainer>
  );
};

export const VariantAvatars = () => {
  return (
    <Avatar
      variant="rounded"
      src="http://dhs3.nyc3.cdn.digitaloceanspaces.com/sigil.png"
    ></Avatar>
  );
};
// const [anchorEl, setAnchorEl] = useState(null);
// const { anchorEl, open, handleClick, handleClose } = useMenu();
// const open = Boolean(anchorEl);
// const handleClick = (event) => {
//   setAnchorEl(event.currentTarget);
// };
// const handleClose = () => {
//   setAnchorEl(null);
// };
