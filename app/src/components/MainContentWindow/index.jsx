import React from 'react';
import styled from '@emotion/styled';
import { RichObjectTreeView } from './Tree';
import {
  getLookupTableAtSelectedSpace,
  getTree,
  useStore,
} from '../../state/store';
import { flatMap, isEmpty, map } from 'lodash';

import CustomizedTreeView from '../Tree/OtherTree';
import { ContentWindowContainer } from './MainContentWindow';
import {
  FileRow,
  Title,
  Metadata,
  Size,
  DateUploaded,
  FileType,
} from './styles';
import { ContentWindowTree } from '../Tree/Tree';
import { Typography } from '@mui/material';
import DataGridDemo from '../Table/Table';
import { flatten } from 'ramda';
import ReactVirtualizedTable from '../Table/VirtualizedTable';

const files = [
  {
    title: 'Mastering Mars.pdf',
    size: '1.6 MB',
    dateUploaded: 'timestamp',
    kind: 'PDF',
  },
  {
    title: 'The Machiavellians.pdf',
    size: '8.4 MB',
    dateUploaded: 'timestamp',
    kind: 'PDF',
  },
  {
    title: 'Atlas Shrugged.pdf',
    size: '2.35 MB',
    dateUploaded: 'timestamp',
    kind: 'PDF',
  },
];
export const MainContentWindow = () => {
  const selectedPath = useStore((state) => state.selectedPath);
  const lookupTable = useStore(getLookupTableAtSelectedSpace);
  const tree = useStore(getTree);

  const contentAtPath =
    selectedPath && !isEmpty(lookupTable) && !isEmpty(lookupTable[selectedPath])
      ? lookupTable[selectedPath]
      : tree;

  const getRows = ({ id, name, path, children, nodes }) => {
    const files = nodes?.files;
    const parentObj = { id, name, path, children, nodes, files };
    const _rows = [...children, ...(files ? files : [])];
    // const rows = _rows.length ? _rows : [getEmptyNode()];
    const rows = _rows.length ? _rows : [];
    return [rows, parentObj];
  };
  const [rows, parent] =
    contentAtPath && !isEmpty(contentAtPath)
      ? getRows(contentAtPath)
      : tree
      ? getRows(tree)
      : [];
  return (
    <ContentWindowContainer>
      {/* <ReactVirtualizedTable /> */}
      <DataGridDemo rows={rows} parent={parent} selectedPath={selectedPath} />
    </ContentWindowContainer>
  );
};

export const Row = ({ node }) => {
  // console.log('node', node);
  return getType(node) === types.FILE ? (
    <FileRow>
      <Title>{node.path}</Title>
      <Metadata>
        <Size>{node.size}</Size>
        <DateUploaded>{node.dateUploaded}</DateUploaded>
        <FileType>{node.kind}</FileType>
      </Metadata>
    </FileRow>
  ) : (
    <Typography
      sx={{
        fontSize: '2px',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '1rem',
      }}
    >
      {node.path}
    </Typography>
  );
};

export const getEmptyNode = () => ({
  id: 'EMPTY_FOLDER',
  name: 'Empty Folder',
  type: 'Folder',
  title: 'Empty Folder',
  size: 'Add File',
  dateUploaded: 'Add',
  kind: 'Empty',
});
export const getFiles = (tree) => tree?.nodes?.files || [];
export const isFolder = (tree) =>
  tree?.children?.length || !isEmpty(tree?.nodes);
export const types = { FOLDER: 'FOLDER', FILE: 'FILE' };
export const getType = (tree) => (isFolder(tree) ? types.FOLDER : types.FILE);
export const getContent = (nodes) => {
  return Array.isArray(nodes.children) || !isEmpty(nodes?.nodes?.files)
    ? [...nodes?.children, ...getFiles(nodes)]
    : [];
};
