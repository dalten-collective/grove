import React, { useState } from 'react';
import {
  RiListCheck,
  RiFunctionLine,
  RiArrowUpSLine,
  RiFunctions,
} from 'react-icons/ri';
import { useStore } from '../../state/store';
import DialogSelect from '../Dialog/Dialog';

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
  FunctionView,
} from './styles';

export const ContentWindowContainer = ({ children }) => {
  const setSelectedViewOption = useStore((state) => state.setSelectedViewOption);
  const [open, setOpen] = React.useState(false);
  return (
    <_ContentWindowContainer>
      <_SortingBar>
        <DisplayOptions>
          <ListView onClick={(evt) => setSelectedViewOption('list')}>
            <RiListCheck />
          </ListView>
          <GridView onClick={(evt) => setSelectedViewOption('grid')}>
            <RiFunctionLine />
          </GridView>
          <FunctionView onClick={(evt) => setOpen(true)}>
            <RiFunctions />
          </FunctionView>
          <DialogSelect open={open} setOpen={setOpen} />
        </DisplayOptions>
        <DateSortContainer>
          <DateText>Date</DateText>
          <DateDropDown>
            <RiArrowUpSLine />
          </DateDropDown>
        </DateSortContainer>
      </_SortingBar>
      <ActualMainContent>{children}</ActualMainContent>
    </_ContentWindowContainer>
  );
};
