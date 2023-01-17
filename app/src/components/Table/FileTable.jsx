import React, { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useStore } from '../../state/store';
import CustomNoRowsOverlay from './EmptyFolder';
import { columns } from './columns';
import { useForm } from '../../state/form';

// TODO: Remove unused styles

function _FileTable({ rows = [], selectedPath, parent }) {
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  const previewSingleItem = useStore((state) => state.previewSingleItem);
  const hydrateFormData = useForm((state) => state.hydrateFormData);
  const hydrateSingleItemActionPreview = useStore(
    (state) => state.hydrateSingleItemActionPreview
  );
  const [_rows, setRows] = useState(() => []);

  console.log('rows', rows);
  useEffect(() => {
    if (!_rows?.length || _rows !== rows) {
      setRows(rows);
    }
  }, [rows, selectedPath]);

  const openAtPath = (params) => {
    const isFile = Boolean(params.row?.dat || params.row?.type === 'record');
    // debugger;
    // TODO: Reset preview on next click if not same file
    // TODO: Handle file preview, maybe open poke form
    if (isFile) {
      // debugger;
      hydrateSingleItemActionPreview(params.row, hydrateFormData);
      // previewSingleItem(params.row.path);
    } else setSelectedPath(params.id);
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        borderStyle: 'none',
        padding: '0px 0px 20px',
      }}
    >
      <DataGrid
        headerHeight={30}
        sx={{
          // m: 2,
          height: '100%',
          width: '100%',
          padding: '0px 0px 20px',
          borderCollapse: 'collapse',
          borderStyle: 'none',
          fontFamily: 'Rubik',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '14px',
          '& > .MuiDataGrid-iconButtonContainer': {
            height: '10px',
          },
          '& > .MuiDataGrid-sortIcon': {
            height: '8px',
            opacity: '1',
            color: 'blue',
          },
          '& .column-header-trove-explorer': {
            borderStyle: 'none',
            '& > .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          },
        }}
        // onRowClick={(params) => {}}
        hideFooter
        onCellDoubleClick={openAtPath}
        rows={_rows}
        columns={columns}
        rowHeight={30}
        pdateUploadedSize={5}
        rowsPerPdateUploadedOptions={[5]}
        // experimentalFeatures={{ newEditingApi: true }}
        components={{
          // Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{ columnMenu: { height: 10 } }}
      />
    </Box>
  );
}

const FileTable = styled(_FileTable)(({ theme }) => ({
  '& > .MuiDataGrid-columnSeparator': {
    visibility: 'hidden',
  },
  '.MuiDataGrid-iconSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },
  '.MuiDataGrid-columnSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },

  '& .MuiDataGrid-root .MuiDataGrid-columnSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },
}));

export default FileTable;

// const [renderDoc, setRenderDoc] = useState(false);
// const [selectedDoc, setSelectedDoc] = useState(null);

/* {renderDoc ? (
    <ImageTable file={selectedDoc} url={selectedDoc?.url} />
  ) : null} */
