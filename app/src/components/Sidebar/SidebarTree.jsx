import React from 'react';
import TreeView from '@mui/lab/TreeView';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useStore } from '../../state/store';
import SidebarTreeItem from './SidebarTreeItem';
import { treeStyles, _SidebarRow } from './styles';
import { getContentProps } from './util';

export default function SidebarTree({ trees }) {
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
}
