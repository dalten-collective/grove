import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import clsx from 'clsx';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';

import { getTree, useStore } from '../../state/store';
import { SpaceInfo } from './Sidebar';
import FullWidthTextField from '../Form';
// import sigil from '../../assets/sigil.png';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const selectedPath = useStore((state) => state.selectedPath);
  const setSelectedPath = useStore((state) => state.setSelectedPath);

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (evt) => {
    handleExpansion(evt);
  };

  const handleRowClick = (evt, x) => {
    handleExpansionClick(evt);
    handleSelectionClick(evt, x);
  };
  const handleSelectionClick = (evt, x) => {
    handleSelection(evt);
    if (x.nodeId === 'root') {
      setSelectedPath(selectedPath?.slice().split('/').slice(0, 2).join('/'));
    } else {
      setSelectedPath(x.nodeId);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        // [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      sx={{
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        gap: '6px',
      }}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <RowDropDownArrow
        onClick={handleExpansionClick}
        className={classes.iconContainer}
      >
        {icon}
      </RowDropDownArrow>
      <RowTitle onClick={(evt) => handleRowClick(evt, { nodeId })}>
        {label}
      </RowTitle>
    </div>
  );
});

CustomContent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,

  // setSelectedPath: PropTypes.func,
};

function CustomTreeItem(props) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

export const RichObjectTreeView = ({ tree }) => {
  const renderTree = (nodes) => (
    <CustomTreeItem
      key={nodes.id}
      nodeId={nodes.id ? nodes.id : 'defaultNodeId'}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? [...nodes?.children]?.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  );

  return tree ? (
    <TreeView
      aria-label="rich object"
      // defaultCollapseIcon={<RiArrowDownSLine />}
      defaultCollapseIcon={<RiArrowDownSLine />}
      defaultExpanded={['root']}
      defaultExpandIcon={<RiArrowRightSLine />}
      sx={{
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
        // overflowY: 'auto',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '14.22px',
      }}
    >
      {renderTree(tree)}
    </TreeView>
  ) : (
    <></>
  );
};

const initalSidebarItemsState = [
  { title: 'Memes', selected: false },
  { title: 'Books', selected: true },
  { title: 'Images', selected: false },
];

// export const useSelectedDocument = () => {};

export const Sidebar = ({}) => {
  const [selectedRow, setSelectedRow] = useState(initalSidebarItemsState);
  const [addFolderToggled, setAddFolderToggled] = useState(false);
  const tree = useStore(getTree);
  const toggleAddFolder = () => {
    setAddFolderToggled(!addFolderToggled);
  };

  return (
    <SidebarContainer>
      <SpaceInfo toggleAddFolder={toggleAddFolder} />
      <RichObjectTreeView tree={tree} />
      {addFolderToggled ? <FullWidthTextField /> : <></>}
      {/* {initalSidebarItemsState.map(({ title, selected }) => (
        <SidebarRow key={title} title={title} selected={selected}></SidebarRow>
      ))} */}
    </SidebarContainer>
  );
};

export const SidebarContainer = styled.div`
  /* Frame 2123 */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px;
  gap: 4px;

  width: 180px;
  height: 430px;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 6px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  /* line-height: 14px; */
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const SidebarRow = ({ title, selected }) => {
  return (
    <_SidebarRow selected={selected}>
      <RowDropDownArrow>
        <RiArrowDownSLine />
      </RowDropDownArrow>
      <RowTitle>{title}</RowTitle>
    </_SidebarRow>
  );
};
// (
//   <_SidebarRow selected={selected}>
//     <RowDropDownArrow>
//       <RiArrowDownSLine />
//       <RowTitle>{title}</RowTitle>
//     </RowDropDownArrow>
//   </_SidebarRow>
// );

export const _SidebarRow = styled.div`
  /* Frame 2155 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 6px 0px 2px;
  /* padding: 2px 6px 2px 2px; */
  gap: 6px;

  width: 168px;
  height: 24px;

  background: ${(props) => (props.selected ? '#F4F4F4' : '#ffffff')};
  border-radius: 4px;
  /* border-radius: 6px; */

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const RowDropDownArrow = styled.div`
  /* remix-icons/line/system/arrow-down-s-line */

  width: 14px;
  height: 14px;

  /* transform: rotate(-90deg); */

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RowTitle = styled.div`
  /* Memes */

  /* width: 40px; */
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.22px;
  display: flex;
  align-items: center;

  color: #333333;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export function IconExpansionTreeView() {
  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <CustomTreeItem nodeId="1" label="Applications">
        <CustomTreeItem nodeId="2" label="Calendar" />
        <CustomTreeItem nodeId="3" label="Chrome" />
        <CustomTreeItem nodeId="4" label="Webstorm" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="5" label="Documents">
        <CustomTreeItem nodeId="10" label="OSS" />
        <CustomTreeItem nodeId="6" label="MUI">
          <CustomTreeItem nodeId="7" label="src">
            <CustomTreeItem nodeId="8" label="index.js" />
            <CustomTreeItem nodeId="9" label="tree-view.js" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
