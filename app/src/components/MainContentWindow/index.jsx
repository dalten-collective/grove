import React from 'react';
import { isEmpty } from 'lodash';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useStore } from '../../state/store';
import {
  getLookupTableAtSelectedSpace,
  getTreeAtSelectedSpace,
} from '../../state/selectors';
// import NewCurioForm from 'landscape-apps/dist/src/heap/NewCurioForm';
// import MultiDMEditModal from '../../lib/EditFolder';
// import ChatChannel from 'landscape-apps/dist/src/chat/ChatChannel';

const ContentWindowContainer = React.lazy(() => import('./MainContentWindow'));
const FileTable = React.lazy(() => import('../Table/FileTable'));
const ImageTable = React.lazy(() => import('../FilePreview/ImageTable'));

export default function MainContentWindow() {
  const selectedPath = useStore((state) => state.selectedPath);
  const showSingleItemPreview = useStore((state) => state.showSingleItemPreview);
  const resetPreviewState = useStore((state) => state.resetPreviewState);
  const singlePreviewItem = useStore((state) => state.getSinglePreviewItem());
  const itemPreviewPath = useStore((state) => state.itemPreviewPath);
  const lookupTable = useStore(getLookupTableAtSelectedSpace);
  const tree = useStore(getTreeAtSelectedSpace);
  const selectedViewOption = useStore((state) => state.selectedViewOption);

  const contentAtPath =
    selectedPath && !isEmpty(lookupTable) && !isEmpty(lookupTable[selectedPath])
      ? lookupTable[selectedPath]
      : tree;

  const getRows = ({ id, name, path, children, nodes }) => {
    const files = nodes?.files;
    const parentObj = { id, name, path, children, nodes, files };
    const _rows = [...(files ? files : []), ...children];
    const rows = _rows.length ? _rows : [];
    return [rows, parentObj];
  };
  const [rows, parent] =
    contentAtPath && !isEmpty(contentAtPath)
      ? getRows(contentAtPath)
      : tree
      ? getRows(tree)
      : [];

  const showPreview =
    showSingleItemPreview && singlePreviewItem && selectedViewOption === 'list';

  // TODO: Keep selectedView rendered or memoizied in background of preview.
  const closePreview = (evt) => {
    resetPreviewState();
  };

  return (
    <ContentWindowContainer>
      {selectedViewOption === 'list' && !showPreview ? (
        <FileTable rows={rows} parent={parent} selectedPath={selectedPath} />
      ) : selectedViewOption === 'grid' && !showPreview ? (
        <ImageTable files={rows} parent={parent} selectedPath={selectedPath} />
      ) : null}
    </ContentWindowContainer>
  );
}

/* {true ? (
  <NewCurioForm /> // <MultiDMEditModal />
) :  */
// const { loaded, hasCredentials, promptUpload } = useFileUpload();
// showPreview ? (
//   <ClickAwayListener onClickAway={(evt) => closePreview(evt)}>
//     <ImageTable style={{ zIndex: '4' }} files={[singlePreviewItem]} />
//   </ClickAwayListener>
// )
