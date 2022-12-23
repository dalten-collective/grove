import React from 'react';
import styled from '@emotion/styled';

export const LocationBar = styled.div`
  /* Frame 2124 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 696px;
  height: 28px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const ArrowNav = styled.div`
  /* Frame 2136 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 40px;
  height: 18px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const LeftArrow = styled.div`
  /* remix-icons/line/system/arrow-left-s-line */

  width: 18px;
  height: 18px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RightArrow = styled.div`
  /* remix-icons/line/system/arrow-right-s-line */

  width: 18px;
  height: 18px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const LocationInfo = styled.div`
  /* Text Input */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 9px 8px 4px;
  gap: 4px;

  width: 646px;
  height: 28px;

  background: #ffffff;
  border: 1px solid #e1e1e1;
  backdrop-filter: blur(7px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 1;
`;

export const ShipInfo = styled.div`
  /* Frame 2138 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 4px;
  gap: 10px;

  width: 93px;
  height: 20px;

  background: #f4f4f4;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const PatP = styled.div`
  /* ~lomder-librun */

  width: 85px;
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #848484;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;

  /* Added */
  white-space: nowrap;
`;

export const Slash = styled.div`
  /* / */

  width: 7px;
  height: 15px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height, or 115% */

  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: rgba(51, 51, 51, 0.22);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const Bucket = styled.div`
  /* Frame 2139 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 4px;
  gap: 10px;

  word-wrap: none;
  width: 43px;
  height: 20px;

  background: #f4f4f4;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;

export const BucketText = styled.div`
  /* Books */

  width: 35px;
  height: 14px;

  word-wrap: none;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #848484;

  /* Inside auto layout */

  flex: none;
  order: 0;
`;
