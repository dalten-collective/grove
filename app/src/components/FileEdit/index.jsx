import React from 'react';
// import { styled } from '@mui/material/styles';

import { useStore } from '../../state/store';
import { FileEditContainer, FileEditTitle, FileEditInput } from './styles';

// Component that allows the user to edit a file or folder using the edit node poke.
// This component is rendered when the user clicks on a file or folder in the table.
// The user can edit the name of the file or folder.
// The user can save changes to the file or folder, which is when we'll persist those changes by calling the edit node or edit folder pokes.
// The user can cancel changes to the file or folder.
// The user should also be able to edit the name of the file or folder by right clicking on the file or folder in the table.

export const FileEdit = () => {
  const { state } = useStore();

  return (
    <FileEditContainer>
      <FileEditTitle>
        {state.selectedFile?.type === 'folder' ? 'Folder' : 'File'} Edit
      </FileEditTitle>
      <FileEditInput
        value={state.selectedFile?.name}
        onChange={(e) => {
          state.selectedFile.name = e.target.value;
        }}
      />
    </FileEditContainer>
  );
};
