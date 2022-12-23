import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useStore } from '../../state/store';
import { RiSave3Line, RiFileTextLine, RiFolder2Line } from 'react-icons/ri';
import { useTrove } from '../../urbit';
import { Stack } from '@mui/material';

export default function FullWidthTextField() {
  const selectedPath = useStore((state) => state.selectedPath);
  const [name, setName] = React.useState('');
  const { urbit, ship, pokes } = useTrove();

  const getSelectedPath = (path) => {
    const pathArray = path.split('/');
    const shipIndex = pathArray.indexOf('our');
    const _selectedPath = pathArray.slice(shipIndex + 1).join('/');
    return _selectedPath?.length ? `/${_selectedPath}` : '/';
  };
  const [fileType, setFileType] = React.useState('folder');
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const toPath = getSelectedPath(selectedPath);
    if (name && selectedPath && toPath) {
      if (fileType === 'folder') {
        pokes.folder.add(
          urbit,
          'our',
          { toPath, name, permissions: null },
          ship
        );
      } else {
        // url,  extension
        pokes.node.add(
          urbit,
          'our',
          {
            toPath,
            url: name,
            extension: '.pdf',
            from: Date.now(),
            by: ship,
            name,
            description: '',
            permissions: null,
          },
          ship
        );
      }
    }
  };
  return (
    <Box
      sx={{
        maxWidth: '100%',
        marginBottom: 2,
        /* Frame 2159 */

        /* Auto layout */

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px 6px 0px 2px',
        gap: '6px',

        width: '168px',
        height: '14px',

        borderRadius: '4px',

        /* Inside auto layout */

        flex: 'none',
        order: '4',
        flexGrow: '0',
      }}
    >
      {fileType === 'file' ? (
        <Paper
          component="form"
          sx={{
            p: '0px 6px 0px 2px',
            fontFamily: 'Rubik',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <IconButton
            type="button"
            sx={{ p: '5px' }}
            aria-label="save"
            onClick={handleSubmit}
          >
            {fileType === 'folder' ? (
              <RiFolder2Line onClick={(evt) => setFileType('file')} />
            ) : (
              <RiFileTextLine onClick={(evt) => setFileType('folder')} />
            )}
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: 'Rubik',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 12,
            }}
            placeholder="https://s3.mars.com/yo.jpeg"
            onChange={handleChange}
            inputProps={{ 'aria-label': 'create new folder' }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ p: '5px' }}
            aria-label="save"
            onClick={handleSubmit}
          >
            <RiSave3Line />
          </IconButton>
        </Paper>
      ) : (
        <Paper
          component="form"
          sx={{
            p: '0px 6px 0px 2px',
            fontFamily: 'Rubik',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <IconButton
            type="button"
            sx={{ p: '5px' }}
            aria-label="save"
            onClick={handleSubmit}
          >
            {fileType === 'folder' ? (
              <RiFolder2Line onClick={(evt) => setFileType('file')} />
            ) : (
              <RiFileTextLine onClick={(evt) => setFileType('folder')} />
            )}
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: 'Rubik',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 12,
            }}
            placeholder="new-folder"
            onChange={handleChange}
            inputProps={{ 'aria-label': 'create new folder' }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ p: '5px' }}
            aria-label="save"
            onClick={handleSubmit}
          >
            <RiSave3Line />
          </IconButton>
        </Paper>
      )}
    </Box>
  );
}

export function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{
        p: '0px 6px 0px 2px',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        width: 400,
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontFamily: 'Rubik',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 12,
        }}
        placeholder="new-folder"
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
        <RiSave3Line />
      </IconButton>
    </Paper>
  );
}
{
  /* <Stack
            // component="form"
            sx={{
              // width: '25ch',
              maxWidth: '100%',
              // wid,
            }}
            // spacing={2}
            // noValidate
            // autoComplete="off"
          > */
}
{
  /* <Stack
          sx={{
            maxWidth: '100%',
            m: '60, 30, 0, 0',
            p: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '2px',
            gap: '10px',
          }}
        > */
}
{
  /* <Paper
            component="form"
            sx={{
              p: '0px 6px 0px 2px',
              fontFamily: 'Rubik',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          > */
}
{
  /* <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: 'Rubik',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 12,
            }}
            placeholder="file extension"
            inputProps={{ 'aria-label': 'file extension' }}
          /> */
}
{
  /* </Paper> */
}
{
  /* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */
}
