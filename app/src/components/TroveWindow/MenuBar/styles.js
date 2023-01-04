import styled from 'styled-components';

export const TopBarContainer = styled.div`
  /* Frame 2120 */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  /* gap: 228px; */

  /* max-width: 100%; */
  /* width: 712px; */
  height: 30px;

  border-radius: 9px 9px 0px 0px;

  /* Inside auto layout */

  /* flex: none; */
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const TopBarIcon = styled.div`
  /* Frame */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 18px;
  height: 18px;

  /* Inside auto layout */

  /* flex: none; */
  order: 0;
  flex-grow: 0;
`;

export const IconVector = styled.div`
  /* Vector */

  width: 11.25px;
  height: 10px;

  background: #8b8b8b;

  /* Inside auto layout */

  /* flex: none; */
  order: 0;
  flex-grow: 0;
`;

export const AppTitle = styled.div`
  /* Trove */

  /* width: 32px; */
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: rgba(51, 51, 51, 0.7);

  /* Inside auto layout */

  /* flex: none; */
  order: 1;
  flex-grow: 0;
`;

export const WindowCloseContainer = styled.div`
  /* remix-icons/line/system/close-line */

  width: 18px;
  height: 18px;

  /* Inside auto layout */

  /* margin-right: 2px; */
  /* flex: none; */
  order: 2;
  flex-grow: 0;
`;

// RiMenu2Line
