import React from 'react';
import PropTypes from 'prop-types';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { _SidebarRow, RowDropDownArrow, RowTitle } from './styles';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const { path, setSelectedPath } = props;
  const treeItem = useTreeItem(props.nodeId);

  const icon = props.icon || props.expansionIcon || props.displayIcon;

  const handleMouseDown = (event) => {
    treeItem.preventSelection(event);
  };
  const handleExpansionClick = (evt) => {
    treeItem.handleExpansion(evt);
  };
  const handleRowClick = (evt, x) => {
    handleExpansionClick(evt);
    handleSelectionClick(evt, x);
  };
  const handleSelectionClick = (evt, x) => {
    treeItem.handleSelection(evt);
    setSelectedPath(path);
  };

  return (
    <div
      className={clsx(props.className, props.classes.root, {
        [props.classes.expanded]: treeItem.expanded,
        // [props.classes.selected]: treeItem.selected,
        [props.classes.focused]: treeItem.focused,
        [props.classes.disabled]: treeItem.disabled,
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
      <RowDropDownArrow
        onClick={handleExpansionClick}
        className={props.classes.iconContainer}
      >
        {icon}
      </RowDropDownArrow>
      <RowTitle
        onClick={(evt) => handleRowClick(evt, { nodeId: props.nodeId })}
      >
        {props.label}
      </RowTitle>
    </div>
  );
});

CustomContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  displayIcon: PropTypes.node,
  expansionIcon: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node,
  nodeId: PropTypes.string.isRequired,
  path: PropTypes.string,
  isRoot: PropTypes.bool || PropTypes.undefined,
  selectedPath: PropTypes.string,
  setSelectedPath: PropTypes.func,
};

export default function SidebarTreeItem(props) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}
