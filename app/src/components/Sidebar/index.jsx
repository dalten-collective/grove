import React, { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri';

import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const BasicTree = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);

  return <FolderTree data={testData} onChange={onTreeStateChange} />;
};

const initalSidebarItemsState = [
  { title: 'Memes', selected: false },
  { title: 'Books', selected: true },
  { title: 'Images', selected: false },
];

// export const useSelectedDocument = () => {};

export const Sidebar = ({}) => {
  const [selectedRow, setSelectedRow] = useState(initalSidebarItemsState);

  return (
    <SidebarContainer>
      {initalSidebarItemsState.map(({ title, selected }) => (
        <SidebarRow key={title} title={title} selected={selected}></SidebarRow>
      ))}
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

  width: 180px;
  height: 430px;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 6px;

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
  padding: 0px;
  gap: 6px;

  width: 168px;
  height: 24px;

  background: ${(props) => (props.selected ? '#F4F4F4' : '#ffffff')};
  border-radius: 6px;

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

  transform: rotate(-90deg);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RowTitle = styled.div`
  /* Memes */

  width: 40px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;

  color: #333333;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
