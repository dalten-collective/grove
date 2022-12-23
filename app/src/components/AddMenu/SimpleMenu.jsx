import React, { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  AddPassportCard,
  FileUploadCard,
  FileUploadIcon,
  FileUploadText,
  NewFolderCard,
  NewFolderIcon,
  NewFolderText,
} from './styles';

export default function useMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, open, handleClick, handleClose };
}

export const SimpleMenu = ({ anchorEl, open, handleClick, handleClose }) => {
  return (
    <AddPassportCard
      // id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      // MenuListProps={{
      //   'aria-labelledby': 'basic-button',
      // }}
    >
      <NewFolderCard onClick={handleClose}>
        {/* <NewFolderIcon />
        <NewFolderText>New Folder</NewFolderText> */}
      </NewFolderCard>
      <FileUploadCard onClick={handleClose}>
        {/* <FileUploadIcon />
        <FileUploadText>Upload File</FileUploadText> */}
      </FileUploadCard>
    </AddPassportCard>
  );
};

// <Fragment>
{
  /* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */
}
{
  /* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > */
}
{
  /* <MenuItem onClick={handleClose}>Logout</MenuItem> */
}

{
  /* </Menu> */
}
// </Fragment>
