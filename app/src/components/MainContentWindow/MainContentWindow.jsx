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
  DateText,
  DateDropDown,
  ActualMainContent,
  FunctionView,
} from './styles';

export default function ContentWindowContainer({ children }) {
  const setSelectedViewOption = useStore((state) => state.setSelectedViewOption);
  const [open, setOpen] = useState(false);
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
}
