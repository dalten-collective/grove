import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useStore } from '../../state/store';
import { RiSave3Line, RiFileTextLine, RiFolder2Line } from 'react-icons/ri';
import { useTrove } from '../../urbit';
import { formatImplicitExtension } from '../../utils/files';

export default function FullWidthTextField() {
  // TODO: Memoize selectors
  const selectedPath = useStore((state) => state.selectedPath);
  const selectedHostSpace = useStore((state) => state.selectedHostSpace);
  const selectedRelativePath = useStore((state) => state.selectedRelativePath);
  const [name, setName] = React.useState('');
  const { urbit, ship, pokes } = useTrove();

  const getSelectedSpace = (path) => {
    if (path.includes(window.ship)) {
      return path.includes('our') ? 'our' : selectedHostSpace;
    }
    return selectedHostSpace;
  };

  const [fileType, setFileType] = React.useState('folder');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const space = getSelectedSpace(selectedPath);
    const toPath = `/${selectedRelativePath}`;

    if (name && selectedPath && space) {
      if (fileType === 'folder') {
        pokes.folder.add(
          urbit,
          space,
          { toPath, name, permissions: null },
          ship
        );
      } else {
        // url,  extension
        pokes.node.add(
          urbit,
          space,
          {
            toPath,
            url: name,
            extension: formatImplicitExtension(name),
            from: Date.now(),
            by: ship,
            name,
            description: name,
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
