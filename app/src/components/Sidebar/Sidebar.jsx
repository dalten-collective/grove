import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import clsx from 'clsx';
import {
  RiArrowDownSLine,
  RiAddLine,
  RiUser3Line,
  RiSettings3Line,
} from 'react-icons/ri';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useMenu, { SimpleMenu } from '../AddMenu/SimpleMenu';
// import { deepOrange, green } from '@mui/material/colors';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  AddPassportCard,
  FileUploadCard,
  FileUploadIcon,
  FileUploadText,
  NewFolderCard,
  NewFolderIcon,
  NewFolderText,
} from '../AddMenu/styles';
import { useStore } from '../../state/store';
import { getShipName } from '../../utils';

export default function VariantAvatars() {
  return (
    // <Stack direction="row" spacing={2}>
    //   <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
    //     N
    //   </Avatar>
    <Avatar
      variant="rounded"
      src="http://dhs3.nyc3.cdn.digitaloceanspaces.com/sigil.png"
    >
      {/* <Avatar variant="rounded" src="../../assets/sigil.png"> */}
      {/* <AssignmentIcon /> */}
    </Avatar>
    // </Stack>
  );
}
export const SpaceInfo = ({ toggleAddFolder }) => {
  // const { anchorEl, open, handleClick, handleClose } = useMenu();
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedPath = useStore((state) => state.selectedPath);
  const [_host, space] = selectedPath?.slice().split('/');
  const host = getShipName(_host);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SpaceInfoContainer>
      <SpaceInfoCard>
        <InnerSpaceInfoCard>
          <SpaceInfoCardElements>
            <SpaceImage>
              {/* <Avatar
                sx={{ widthe: '100%', height: '80%' }}
                variant="rounded"
                src="../../assets/sigil.png"
              >
              </Avatar> */}
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
          <FolderPlusContainer onClick={toggleAddFolder}>
            <RiAddLine />
            {/* <RiAddLine onClick={handleClick} /> */}
          </FolderPlusContainer>
          {/* <SimpleMenu
            anchorEl={anchorEl}
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
          /> */}
          {/* <AddPassportCard
            // id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // MenuListProps={{
            //   'aria-labelledby': 'basic-button',
            // }}
          > */}
          {/* <NewFolderCard onClick={handleClose}> */}
          {/* <NewFolderIcon />
              <NewFolderText>New Folder</NewFolderText> */}
          {/* </NewFolderCard> */}
          {/* <FileUploadCard onClick={handleClose}> */}
          {/* <FileUploadIcon />
              <FileUploadText>Upload File</FileUploadText> */}
          {/* </FileUploadCard> */}
          {/* </AddPassportCard> */}
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

export const SpaceInfoContainer = styled.div`
  /* Frame 2241 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;

  width: 168px;
  height: 63px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceInfoCard = styled.div`
  /* Frame 2195 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  gap: 10px;

  width: 168px;
  height: 29px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceInfoToolbar = styled.div`
  /* Toolbar */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 2px;
  gap: 8px;

  width: 168px;
  height: 28px;

  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const SpaceInfoInnerToolbar = styled.div`
  /* Frame 50 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 164px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const FolderPlusContainer = styled.div`
  /* Frame 2241 */

  /* Auto layout */

  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  /* flex-direction: row;
  align-items: flex-start; */
  padding: 0px;
  gap: 4px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ToolbarIconContainer = styled.div`
  /* Frame 2238 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 44px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ToolbarPeopleContainer = styled.div`
  /* Icon */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ToolbarSettingsContainer = styled.div`
  /* Icon */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const InnerSpaceInfoCard = styled.div`
  /* Frame 2237 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 2px 0px 0px;
  gap: 8px;

  width: 164px;
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const SpaceInfoCardElements = styled.div`
  /* Community */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;

  width: 121px;
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceImage = styled.div`
  /* Rectangle 3665 */

  box-sizing: border-box;

  width: 22px;
  height: 22px;

  background: url(http://dhs3.nyc3.cdn.digitaloceanspaces.com/sigil.png);
  /* background: url(../../assets/sigil.png); */
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceName = styled.div`
  /* Frame 2054 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  /* width: 93px; */
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const SpaceNameSmall = styled.div`
  /* Frame 2057 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 6px;

  width: 29px;
  height: 12px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceNameSmallText = styled.div`
  /* Group */

  width: 29px;
  height: 12px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceNameBigText = styled.div`
  /* Holy Urbit Empire */

  /* width: 93px; */
  height: 13px;

  font-family: 'Rubik';
  font-style: normal;
  word-wrap: none;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: rgba(51, 51, 51, 0.9);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
