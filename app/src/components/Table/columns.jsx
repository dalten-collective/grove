import React from 'react';
import {
  TitleType,
  SizeType,
  Title,
  Size,
  DateUploaded,
  FileType,
} from '../MainContentWindow/styles';
import { getDateUploaded } from '../../utils';
import { getFileType } from '../../utils/files';

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    renderHeader: () => <Size>ID</Size>,
    headerClassName: 'column-header-trove-explorer',
    border: 'none',
    valueGetter: ({ row: { id } }) =>
      id?.slice().split('/').length > 1 ? '' : id,
    // ...SizeType,
  },
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
