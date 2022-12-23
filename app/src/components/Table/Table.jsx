import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import {
  FileRow,
  FileTypeType,
  TitleType,
  MetadataType,
  SizeType,
  DateUploadedType,
  Title,
  Metadata,
  Size,
  DateUploaded,
  FileType,
} from '../MainContentWindow/styles';
import { getDateTime } from '../../utils';
import { useStore } from '../../state/store';
import { CustomNoRowsOverlay } from './EmptyFolder';

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
    width: 170,
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
    width: 80,
    ...SizeType,
  },
  // {
  //   field: 'dateUploaded',
  //   headerName: 'Date Uploaded',
  //   type: 'date',
  //   width: 100,
  // },
  {
    field: 'type',
    headerName: 'Type',
    renderHeader: (params) => <FileType>Type</FileType>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    description: 'Folder or Record',
    width: 80,
  },
  {
    field: 'timestamp',
    headerName: 'Date Uploaded',
    type: 'dateTime',
    renderHeader: (params) => <DateUploaded>Date Uploaded</DateUploaded>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${
        params?.row?.dateUploaded ? getDateTime(params.row.dateUploaded) : ''
      }`,
  },
];

const tableHeaderClass = {
  lineHeight: 30,
  maxHeight: 30,
  minHeight: 10,
  borderTop: 'none',
};

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

export default function DataGridDemo({
  rows = fakeRows,
  selectedPath,
  parent,
}) {
  // console.log('parent', parent);
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  // const [selectionModel, setSelectionModel] = useState([]);
  const [_rows, setRows] = useState(() => []);
  useEffect(() => {
    if (!_rows?.length || _rows !== rows) {
      setRows(rows);
    }
  }, [rows, selectedPath]);

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
    params.id && setSelectedPath(params.id);
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
        // headerClassName={tableHeaderClass}
        sx={{
          height: '100%',
          width: '100%',
          borderCollapse: 'collapse',
          borderStyle: 'none',
          fontFamily: 'Rubik',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '14px',
          '& .column-header-trove-explorer': {
            borderStyle: 'none',
          },
        }}
        // onRowClick={(params) => {}}
        // onSelectionModelChange={(newSelectionModel) => {
        //   // debugger;
        //   // selectionModel={selectionModel}
        //   if (newSelectionModel === selectionModel) {
        //     setSelectedPath(newSelectionModel[0]);
        //     setSelectionModel(newSelectionModel);
        //   } else setSelectionModel(newSelectionModel);
        // }}
        hideFooter
        // hideFooterPagination
        // hideFooterSelectedRowCount
        onCellDoubleClick={openAtPath}
        rows={_rows}
        columns={columns}
        rowHeight={30}
        pdateUploadedSize={5}
        rowsPerPdateUploadedOptions={[5]}
        // selectionModel={selectionModel}
        // checkboxSelection
        // disableSelectionOnClick
        // enableMultipleSelection
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
