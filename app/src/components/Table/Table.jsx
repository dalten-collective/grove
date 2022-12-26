import React, { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import {
  TitleType,
  SizeType,
  Title,
  Size,
  DateUploaded,
  FileType,
} from '../MainContentWindow/styles';
import { useStore } from '../../state/store';
import { CustomNoRowsOverlay } from './EmptyFolder';
import FileViewer from './FileViewer';
import { ImageTable } from '../FilePreview/ImageTable';
import { getDateUploaded } from '../../utils';
import { getFileType } from '../../utils/files';
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 3,
    renderHeader: (params) => <Title>Name</Title>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    // editable: true,
    ...TitleType,
  },

  {
    field: 'size',
    headerName: 'Size',
    renderHeader: (params) => <Size>Size</Size>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    flex: 1,
    ...SizeType,
  },
  {
    field: 'type',
    headerName: 'Type',
    renderHeader: (params) => <FileType>Type</FileType>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    flex: 1,
    description: 'Folder or Record',
    valueGetter: ({ row }) => getFileType(row),
  },
  // {
  //   field: 'description',
  //   headerName: 'Description',
  //   // renderHeader: (params) => <FileType>Type</FileType>,
  //   headerClassName: 'column-header-trove-explorer',
  //   border: 'none',
  //   flex: 1,
  //   // description: 'Folder or Record',
  //   // minWidth: '50px',
  // },
  {
    field: 'timestamp',
    headerName: 'Date Uploaded',
    type: 'dateTime',
    renderHeader: (params) => <DateUploaded>Date Uploaded</DateUploaded>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    flex: 2,
    sortable: false,
    valueGetter: ({ row }) => getDateUploaded(row),
  },
];

const fakeRows = [
  { id: 1, name: 1, type: 'Snow', size: 'Jon', dateUploaded: 35 },
  { id: 2, name: 2, type: 'Lannister', size: 'Cersei', dateUploaded: 42 },
  { id: 3, name: 3, type: 'Lannister', size: 'Jaime', dateUploaded: 45 },
  { id: 4, name: 4, type: 'Stark', size: 'Arya', dateUploaded: 16 },
  { id: 5, name: 5, type: 'Targaryen', size: 'Daenerys', dateUploaded: null },
  { id: 6, name: 6, type: 'Melisandre', size: null, dateUploaded: 150 },
  { id: 7, name: 7, type: 'Clifford', size: 'Ferrara', dateUploaded: 44 },
  { id: 8, name: 8, type: 'Frances', size: 'Rossini', dateUploaded: 36 },
  { id: 9, name: 9, type: 'Roxie', size: 'Harvey', dateUploaded: 65 },
];

const FileTable = styled(_FileTable)(({ theme }) => ({
  '& > .MuiDataGrid-columnSeparator': {
    visibility: 'hidden',
  },
  '.MuiDataGrid-iconSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },
  // '& .MuiDataGrid-virtualScroller': {
  //   marginTop: '0 !important',
  // },
  '.MuiDataGrid-columnSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },

  '& .MuiDataGrid-root .MuiDataGrid-columnSeparator': {
    color: 'transparent',
    visibility: 'hidden',
  },
}));

export function _FileTable({ rows = fakeRows, selectedPath, parent }) {
  // console.log('parent', parent);
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  const [renderDoc, setRenderDoc] = useState(false);
  const [_rows, setRows] = useState(() => []);
  useEffect(() => {
    if (!_rows?.length || _rows !== rows) {
      setRows(rows);
    }
  }, [rows, selectedPath]);

  const [selectedDoc, setSelectedDoc] = useState(null);
  // const handleAddRow = () => {
  //   // setRows((prevRows) => [...prevRows, createRandomRow()]);
  //   setRows((prevRows) => [{ name: Yo }, ...prevRows]);
  // };
  // const handleUpdateRow = () => {
  //   setRows((prevRows) => {
  //     const rowToUpdateIndex = randomInt(0, rows.length - 1);

  //     return prevRows.map((row, index) =>
  //       index === rowToUpdateIndex
  //         ? { ...row, username: randomUserName() }
  //         : row
  //     );
  //   });
  // };
  // const handleDeleteRow = () => {
  //   setRows((prevRows) => {
  //     const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
  //     return [
  //       ...rows.slice(0, rowToDeleteIndex),
  //       ...rows.slice(rowToDeleteIndex + 1),
  //     ];
  //   });
  // };
  const openAtPath = (params) => {
    const isPDF =
      params.row?.dat?.extension === '.pdf' ||
      params.row?.dat?.extension === 'pdf';
    if (isPDF) {
      setSelectedDoc(params.row);
      setRenderDoc(true);
    } else {
      params.id && setSelectedPath(params.id);
    }
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
      {/* {renderDoc ? (
        <ImageTable file={selectedDoc} url={selectedDoc?.url} />
      ) : null} */}
      <DataGrid
        headerHeight={30}
        // headerClassName={tableHeaderClass}
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
        // hideFooterPagination
        // hideFooterSelectedRowCount
        onCellDoubleClick={openAtPath}
        rows={_rows}
        columns={columns}
        rowHeight={30}
        pdateUploadedSize={5}
        rowsPerPdateUploadedOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          // Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{ columnMenu: { height: 10 } }}
      />
    </Box>
  );
}

export default FileTable;
