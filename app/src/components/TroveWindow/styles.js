import styled from 'styled-components';

export const MainContainer = styled.div`
  /* Frame 2121 */

  /* Auto layout */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 8px 10px;
  gap: 8px;

  /* width: 712px; */
  /* height: 476px; */

  /* Inside auto layout */

  /* flex: none; */
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

export const MainContentContainer = styled.div`
  /* Frame 2154 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  /* width: 696px; */
  /* height: 430px; */

  /* Inside auto layout */

  /* flex: none; */
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

export const WindowContainer = styled.div`
  /* Frame 2049 */

  box-sizing: border-box;
  height: 100%;
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  /* position: absolute; */
  /* width: 712px; */
  /* height: 506px; */
  /* left: 76px;
  top: 62px; */

  background: #fbfbfb;
  border: 1px solid rgba(219, 219, 219, 0.8);
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.05);
  border-radius: 9px;
`;
