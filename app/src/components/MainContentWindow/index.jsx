import React from 'react';
import { RiListCheck, RiFunctionLine, RiArrowUpSLine } from 'react-icons/ri';
import styled from 'styled-components';

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
  return (
    <ContentWindowContainer>
      <SortingBar>
        <DisplayOptions>
          <ListView>
            <RiListCheck />
          </ListView>
          <GridView>
            <RiFunctionLine />
          </GridView>
        </DisplayOptions>
        <DateSortContainer>
          <DateText></DateText>
          <DateDropDown>
            <RiArrowUpSLine />
          </DateDropDown>
        </DateSortContainer>
      </SortingBar>
      <ActualMainContent>
        <InfoSortingBar></InfoSortingBar>
        {files.map((file) => (
          <FileRow>
            <Title>{file.title}</Title>
            <Metadata>
              <Size>{file.size}</Size>
              <DateUploaded>{file.dateUploaded}</DateUploaded>
              <FileType>{file.kind}</FileType>
            </Metadata>
          </FileRow>
        ))}
      </ActualMainContent>
    </ContentWindowContainer>
  );
};

export const ContentWindowContainer = styled.div`
  /* Frame 2125 */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 12px;

  width: 512px;
  height: 430px;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 6px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

export const SortingBar = styled.div`
  /* Frame 2163 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0px;
  gap: 10px;

  width: 488px;
  height: 32px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const DisplayOptions = styled.div`
  /* Frame 2165 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 40px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ListView = styled.div`
  /* remix-icons/line/editor/list-check */

  width: 16px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const GridView = styled.div`
  /* remix-icons/line/system/function-line */

  width: 16px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const DateSortContainer = styled.div`
  /* Frame 2166 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 44px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const DateText = styled.div`
  /* Date */

  width: 24px;
  height: 12px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: rgba(51, 51, 51, 0.7);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const DateDropDown = styled.div`
  /* remix-icons/line/system/arrow-up-s-line */

  width: 16px;
  height: 16px;

  transform: rotate(-180deg);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ActualMainContent = styled.div`
  /* Frame 2164 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 488px;
  height: 398px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

export const InfoSortingBar = styled.div`
  /* Frame 2181 */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 0px;
  gap: 10px;

  width: 488px;
  height: 20px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const FileRow = styled.div`
  /* Frame 2182 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 0px;
  gap: 10px;

  width: 488px;
  height: 22px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Title = styled.div`
  /* Mastering Mars.pdf */

  width: 234px;
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
  order: 0;
  flex-grow: 1;
`;

const Metadata = styled.div`
  /* Frame 2182 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 244px;
  height: 14px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Size = styled.div`
  /* 1.6 MB */

  width: 53px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: right;

  color: rgba(51, 51, 51, 0.7);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const DateUploaded = styled.div`
  /* 07/15/22 at 9:23 AM */

  width: 121px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: right;

  color: rgba(51, 51, 51, 0.7);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const FileType = styled.div`
  /* PDF */

  width: 50px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: right;

  color: rgba(51, 51, 51, 0.7);

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;
