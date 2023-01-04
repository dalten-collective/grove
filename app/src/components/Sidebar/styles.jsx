import styled from 'styled-components';

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

export const treeStyles = {
  // height: 110,
  flexGrow: 1,
  maxWidth: 400,
  // overflowY: 'auto',
  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '14.22px',
};

export const SidebarContainer = styled.div`
  /* Frame 2123 */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px;
  gap: 4px;

  width: 180px;
  /* height: 430px; */

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 6px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  /* line-height: 14px; */
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const _SidebarRow = styled.div`
  /* Frame 2155 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 6px 0px 2px;
  /* padding: 2px 6px 2px 2px; */
  gap: 6px;

  width: 168px;
  height: 24px;

  background: ${(props) => (props.selected ? '#F4F4F4' : '#ffffff')};
  border-radius: 4px;
  /* border-radius: 6px; */

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

  /* transform: rotate(-90deg); */

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RowTitle = styled.div`
  /* Memes */

  /* width: 40px; */
  height: 14px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.22px;
  display: flex;
  align-items: center;

  color: #333333;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const SpaceInfoContainer = styled.div`
  /* Frame 2241 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;

  width: 168px;
  height: 63px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceInfoCard = styled.div`
  /* Frame 2195 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  gap: 10px;

  width: 168px;
  height: 29px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceInfoToolbar = styled.div`
  /* Toolbar */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 2px;
  gap: 8px;

  width: 168px;
  height: 28px;

  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const SpaceInfoInnerToolbar = styled.div`
  /* Frame 50 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 164px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const FolderPlusContainer = styled.div`
  /* Frame 2241 */

  /* Auto layout */

  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  /* flex-direction: row;
align-items: flex-start; */
  padding: 0px;
  gap: 4px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ToolbarIconContainer = styled.div`
  /* Frame 2238 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 44px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ToolbarPeopleContainer = styled.div`
  /* Icon */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ToolbarSettingsContainer = styled.div`
  /* Icon */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const InnerSpaceInfoCard = styled.div`
  /* Frame 2237 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 2px 0px 0px;
  gap: 8px;

  width: 164px;
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const SpaceInfoCardElements = styled.div`
  /* Community */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;

  width: 121px;
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceImage = styled.div`
  /* Rectangle 3665 */

  box-sizing: border-box;

  height: 22px;
  /* height: 100%; */
  width: 22px;

  /* background: url(http://dhs3.nyc3.cdn.digitaloceanspaces.com/sigil.png); */
  /* background: url(../../assets/sigil.png); */
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceName = styled.div`
  /* Frame 2054 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  /* width: 93px; */
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const SpaceNameSmall = styled.div`
  /* Frame 2057 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 6px;

  width: 29px;
  height: 12px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceNameSmallText = styled.div`
  /* Group */

  width: 29px;
  height: 12px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SpaceNameBigText = styled.div`
  /* Holy Urbit Empire */

  /* width: 93px; */
  height: 13px;

  font-family: 'Rubik';
  font-style: normal;
  word-wrap: none;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: rgba(51, 51, 51, 0.9);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
