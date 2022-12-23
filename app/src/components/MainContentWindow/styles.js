import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const contentWindowStylesObj = {
  /* Frame 2125 */

  boxSizing: `border-box`,

  /* Auto layout */

  display: `flex`,
  flexDirection: `column`,
  alignItems: `flex-start`,
  padding: `0px 12px`,

  width: `512px`,
  height: `430px`,
  maxWidth: `100%`,
  maxHeight: `100%`,

  background: `#ffffff`,
  border: `1px solid rgba(0, 0, 0, 0.09)`,
  borderRadius: `6px`,

  /* Inside auto layout */

  flex: `none`,
  order: 1,
  alignSelf: `stretch`,
  flexGrow: 1,
};

// export const contentWindowStyles = `
// /* Frame 2125 */

// box-sizing: border-box;

// /* Auto layout */

// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px 12px;

// width: 512px;
// height: 430px;

// background: #ffffff;
// border: 1px solid rgba(0, 0, 0, 0.09);
// border-radius: 6px;

// /* Inside auto layout */

// flex: none;
// order: 1;
// align-self: stretch;
// flex-grow: 1;
// `;
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

export const DisplayOptions = styled.div`
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

export const ListView = styled.div`
  /* remix-icons/line/editor/list-check */

  width: 16px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const GridView = styled.div`
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

  /* cont */
  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const fileRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '4px 0px',
  gap: '10px',
  width: '488px',
  height: '22px',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};

export const Title = styled.div`
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

export const TitleType = styled(Typography)`
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

  /* max-height: 14px; */
  word-wrap: none;
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const Metadata = styled.div`
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

export const MetadataType = styled(Typography)`
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

export const SizeType = styled(Typography)`
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

export const DateUploadedType = styled(Typography)`
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

export const FileTypeType = styled(Typography)`
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

export const Size = styled.div`
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

export const DateUploaded = styled.div`
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

export const FileType = styled.div`
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
