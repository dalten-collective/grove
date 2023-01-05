import React, { useState } from 'react';
import { useStore } from '../../state/store';
import { getTrees } from '../../state/selectors';
import { SidebarContainer, _SidebarRow } from './styles';
import { initalSidebarItemsState } from './util';
// import UploadFile from '../FileUpload/UploadFile';
import SpaceInfo from './SidebarSpaceInfo';
import SidebarTree from './SidebarTree';
import FullWidthTextField from '../Form';
import UploadFile from '../FileUpload/UploadFile';

// const SpaceInfo = React.lazy(() => import('./SidebarSpaceInfo'));
// const SidebarTree = React.lazy(() => import('./SidebarTree'));
// const FullWidthTextField = React.lazy(() => import('../Form'));
// const UploadFile = React.lazy(() => import('../FileUpload/UploadFile'));

export default function Sidebar({}) {
  const [selectedRow, setSelectedRow] = useState(initalSidebarItemsState);
  const [addFolderToggled, setAddFolderToggled] = useState(false);
  const [uploadFileToggled, setUploadFileToggled] = useState(false);
  const trees = useStore(getTrees);
  const toggleAddFolder = () => {
    setAddFolderToggled(!addFolderToggled);
  };
  const toggleUploadFile = () => {
    setUploadFileToggled(!uploadFileToggled);
  };

  return (
    <SidebarContainer>
      <SpaceInfo
        toggleAddFolder={toggleAddFolder}
        toggleUploadFile={toggleUploadFile}
      />
      <SidebarTree trees={trees} />
      {addFolderToggled ? <FullWidthTextField /> : <></>}
      {/* {uploadFileToggled ? <FullWidthTextField /> : <></>} */}
      <UploadFile open={uploadFileToggled} setOpen={setUploadFileToggled} />
    </SidebarContainer>
  );
}

// export const logWindow = () => {
//   if (typeof window !== 'undefined' && window.ipcRenderer) {
//     console.log(window);
//     debugger;
//   }
// };
