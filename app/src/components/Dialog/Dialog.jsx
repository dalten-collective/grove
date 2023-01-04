import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import Select from '@mui/material/Select';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useStore } from '../../state/store';
import { PokeForm } from '../PokeForm/pokeform';

export default function DialogSelect({ open, setOpen }) {
  const selectedPath = useStore((state) => state.selectedPath);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>{selectedPath}</DialogTitle>
      {/* <ClickAwayListener onClickAway={handleClose}> */}
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
