import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useStore } from '../../state/store';
import { PokeForm } from '../PokeForm/PokeForm';
import UploadFile from '../FileUpload/UploadFile';
import useUploadFileTrigger from '../FileUpload/useUploadFileTrigger';
import { IconButton } from '@mui/material';

export default function DialogSelect({ open, setOpen }) {
  const selectedPath = useStore((state) => state.selectedPath);
  const fileUploadToggle = useUploadFileTrigger({
    addToTroveOnUpload: true,
    selectedPath,
  });

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {selectedPath}
        <IconButton onClick={fileUploadToggle.toggleUploadFile}>
          <RiUploadCloud2Line />
        </IconButton>
      </DialogTitle>
      {/* <ClickAwayListener onClickAway={handleClose}> */}

      <UploadFile
        open={fileUploadToggle.uploadFileToggled}
        setOpen={fileUploadToggle.setUploadFileToggled}
      />

      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <PokeForm selectedPath={selectedPath} handleClose={handleClose} />
        </Box>
      </DialogContent>
      {/* </ClickAwayListener> */}
      <DialogActions></DialogActions>
    </Dialog>
  );
}
