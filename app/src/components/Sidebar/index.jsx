import React, { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useStore } from '../../state/store';
import { getTree, getTrees } from '../../state/selectors';
import { SpaceInfo } from './SidebarSpaceInfo';
import FullWidthTextField from '../Form';
import { SidebarContainer, treeStyles, _SidebarRow } from './styles';
import SidebarTreeItem from './SidebarTreeItem';
import { getContentProps, initalSidebarItemsState } from './util';
import UploadFile from '../FileUpload/UploadFile';

export const Sidebar = ({}) => {
  const [selectedRow, setSelectedRow] = useState(initalSidebarItemsState);
  const [addFolderToggled, setAddFolderToggled] = useState(false);
  const [uploadFileToggled, setUploadFileToggled] = useState(false);
  const trees = useStore(getTrees);
  const toggleAddFolder = () => {
    setAddFolderToggled(!addFolderToggled);
  };
  const toggleUploadFile = () => {
    setUploadFileToggled(!uploadFileToggled);
  };

  return (
    <SidebarContainer>
      <SpaceInfo
        toggleAddFolder={toggleAddFolder}
        toggleUploadFile={toggleUploadFile}
      />
      <SidebarTree trees={trees} />
      {addFolderToggled ? <FullWidthTextField /> : <></>}
      {/* {uploadFileToggled ? <FullWidthTextField /> : <></>} */}
      <UploadFile open={uploadFileToggled} setOpen={setUploadFileToggled} />
    </SidebarContainer>
  );
};

export const SidebarTree = ({ trees }) => {
  const selectedPath = useStore((state) => state.selectedPath);
  const setSelectedPath = useStore((state) => state.setSelectedPath);

  const renderChildren = (nodes) => {
    return Array.isArray(nodes.children)
      ? [...nodes?.children]?.map((node) => renderTree(node))
      : null;
  };
  const renderTree = (nodes) =>
    nodes?.id && (
      <SidebarTreeItem
        key={nodes.id}
        nodeId={nodes.id ? nodes.id : 'defaultNodeId'}
        {...getContentProps(nodes, selectedPath, setSelectedPath)}
        label={nodes.name}
      >
        {renderChildren(nodes)}
      </SidebarTreeItem>
    );

  return trees.length
    ? trees.map((tree, idx) => (
        <TreeView
          key={tree?.path || idx}
          aria-label="sidebar trove tree"
          defaultCollapseIcon={<RiArrowDownSLine />}
          // defaultExpanded={['root']}
          defaultExpandIcon={<RiArrowRightSLine />}
          sx={treeStyles}
        >
          {renderTree(tree)}
        </TreeView>
      ))
    : null;
};

// export const logWindow = () => {
//   if (typeof window !== 'undefined' && window.ipcRenderer) {
//     console.log(window);
//     debugger;
//   }
// };
