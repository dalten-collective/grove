import React, { useState } from 'react';
import { RiListCheck, RiFunctionLine, RiArrowUpSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useStore } from '../../state/store';

import {
  ContentWindowContainer as _ContentWindowContainer,
  SortingBar as _SortingBar,
  DisplayOptions,
  ListView,
  GridView,
  DateSortContainer,
  InfoSortingBar,
  DateText,
  DateDropDown,
  ActualMainContent,
} from './styles';
// import CustomizedTreeView from '../Tree/OtherTree';

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
export const ContentWindowContainer = ({ children }) => {
  const setSelectedViewOption = useStore(
    (state) => state.setSelectedViewOption
  );
  return (
    <_ContentWindowContainer>
      <_SortingBar>
        <DisplayOptions>
          <ListView onClick={(evt) => setSelectedViewOption('list')}>
            <RiListCheck />
          </ListView>
          <GridView onClick={(evt) => setSelectedViewOption('grud')}>
            <RiFunctionLine />
          </GridView>
        </DisplayOptions>
        <DateSortContainer>
          <DateText>Date</DateText>
          <DateDropDown>
            <RiArrowUpSLine />
          </DateDropDown>
        </DateSortContainer>
      </_SortingBar>
      <ActualMainContent>
        {/* <InfoSortingBar></InfoSortingBar> */}
        {/* <RichObjectTreeView tree={contentAtPath} /> */}
        {/* <CustomizedTreeView /> */}
        {children}
      </ActualMainContent>
    </_ContentWindowContainer>
  );
};
