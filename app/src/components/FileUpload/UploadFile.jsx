import React, { useCallback, useEffect, useState, useRef } from 'react';
import { findLast } from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useStore } from '../../state/store';
import { PokeForm } from '../PokeForm/pokeform';
import { useFileStore } from 'landscape-apps/dist/src/state/storage';
import useFileUpload from 'landscape-apps/dist/src/logic/useFileUpload';

export default function UploadFile({ open, setOpen }) {
  const selectedPath = useStore((state) => state.selectedPath);
  const [uploadError, setUploadError] = useState(null);
  const { loaded, hasCredentials, promptUpload } = useFileUpload();
  const fileId = useRef(`chat-input-${Math.floor(Math.random() * 1000000)}`);
  const mostRecentFile = useFileStore((state) =>
    findLast(state.files, ['for', fileId.current])
  );

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleUpload = (evt) => {
    // const shouldPrompot = loaded && hasCredentials;
    evt.preventDefault();
    promptUpload(fileId.current);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>{selectedPath}</DialogTitle>
      {/* <ClickAwayListener onClickAway={handleClose}> */}
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
      </DialogContent>
      {/* </ClickAwayListener> */}

      <DialogActions>
        {open ? (
          <Button title="Upload a file" onClick={handleUpload}>
            {mostRecentFile && mostRecentFile.status === 'loading' ? (
              <LoadingSpinner secondary="black" className="h-4 w-4" />
            ) : (
              'Upload File'
            )}
          </Button>
        ) : null}
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
