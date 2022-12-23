import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const AddPassportCard = styled(Menu)`
  /* PassportCard - Vertical */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px;
  gap: 2px;

  position: absolute;
  width: 135px;
  height: 66px;
  left: 92px;
  top: 194px;

  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(203, 203, 203, 0.43);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(72px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px;
`;

// export const NewFolderCard = styled(MenuItem)`
export const NewFolderCard = styled.div`
  /* Frame 2242 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  gap: 10px;

  width: 127px;
  height: 28px;

  background: #f6f6f6;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

// export const FileUploadCard = styled(MenuItem)`
export const FileUploadCard = styled.div`
  /* Frame 2243 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  gap: 10px;

  width: 127px;
  height: 28px;

  border-radius: 0px 0px 6px 6px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const NewFolderIcon = styled.div`
  /* remix-icons/line/document/folder-add-line */

  width: 16px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const NewFolderText = styled(Typography)`
  /* New folder */

  width: 60px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #333333;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const FileUploadIcon = styled.div`
  /* remix-icons/line/system/upload-cloud-2-line */

  width: 16px;
  height: 16px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const FileUploadText = styled(Typography)`
  /* File upload */

  width: 61px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #333333;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
