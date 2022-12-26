import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import { getTree, useStore } from '../../state/store';
import {
  FileRow,
  Title,
  Metadata,
  Size,
  DateUploaded,
  FileType,
  contentWindowStylesObj,
  fileRowStyle,
  TitleType,
  MetadataType,
  SizeType,
  DateUploadedType,
  FileTypeType,
} from '../MainContentWindow/styles';
import { logLarge } from '../../utils';
import { isEmpty } from 'lodash';
import TransitionComponent from './Transition';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    file,
  } = props;

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
    console.log('handleExpansionClick evt', evt);
    handleExpansion(evt);
  };

  const handleRowClick = (evt, x) => {
    // if (evt.detail === 1) handleExpansionClick(evt);
    if (evt.detail === 2) handleSelectionClick(evt, x);
  };
  const handleSelectionClick = (evt, x) => {
    handleSelection(evt);
    setSelectedPath(x.nodeId);
  };

  logLarge('CustomContent props', props);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      onClick={(evt) => handleRowClick(evt, { nodeId })}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {/* <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div> */}
      {/* <div
        onClick={(evt) => handleRowClick(evt, { nodeId })}
        // component="div"
        // className={classes.label}
      > */}
      <FileRow>
        <TitleType>{props?.file?.title || label}</TitleType>
        <Metadata>
          <SizeType>{props?.file?.size || label}</SizeType>
          <DateUploadedType>
            {props?.file?.dateUploaded || label}
          </DateUploadedType>
          <FileTypeType>{props?.file?.kind || label}</FileTypeType>
        </Metadata>
      </FileRow>
      {/* {label} */}
      {/* </div> */}
      {/* <Typography
        onClick={(evt) => handleRowClick(evt, { nodeId })}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography> */}
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
  /**
   * The file.
   */
  file: PropTypes.object,
  /**
   * The file.
   */
  folderFileType: PropTypes.string,

  // setSelectedPath: PropTypes.func,
};

function CustomTreeItem(props) {
  return (
    <TreeItem
      ContentComponent={CustomContent}
      ContentProps={{ file: props.file, folderFileType: props.folderFileType }}
      {...props}
    />
  );
}

const getFiles = (tree) => tree?.nodes?.files || [];
const isFolder = (tree) => tree?.children?.length || !isEmpty(tree?.nodes);
const types = { FOLDER: 'FOLDER', FILE: 'FILE' };
const getType = (tree) => (isFolder(tree) ? types.FOLDER : types.FILE);

export const ContentWindowTree = (props) => {
  logLarge('props.tree', props?.tree);
  logLarge('props', props);

  const renderTree = (nodes) => {
    return Array.isArray(nodes.children) || !isEmpty(nodes?.nodes)
      ? [...nodes?.children, ...getFiles(nodes)]?.map((node) => (
          <_CustomTreeItem
            key={node.id}
            nodeId={node.id ? node.id : 'defaultNodeId'}
            label={node.name}
            file={node}
            folderFileType={getType(node)}
            TransitionComponent={TransitionComponent}
          ></_CustomTreeItem>
        ))
      : null;
  };

  return props?.tree ? (
    <_TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: '100%',
        flexGrow: 1,
        maxWidth: 400,
        overflowY: 'auto',
      }}
    >
      {renderTree(props.tree)}
    </_TreeView>
  ) : (
    <></>
  );
};

export const _TreeView = styled(TreeView)(contentWindowStylesObj);

export const _CustomTreeItem = styled(CustomTreeItem)(fileRowStyle);

export const fakeData = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};
