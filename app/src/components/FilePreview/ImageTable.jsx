import React from 'react';
import { PhotoProvider } from 'react-photo-view';
import ImageList from '@mui/material/ImageList';
import 'react-photo-view/dist/react-photo-view.css';
import { FilePreview } from './FilePreview';
import { EmptyOverlayContainer, ImagesContainer } from './styles';
import CustomNoRowsOverlay from '../Table/EmptyFolder';
// const CustomNoRowsOverlay = React.lazy(() => import('../Table/EmptyFolder'));

export default function ImageTable({ files = [] }) {
  return files?.length ? (
    <ImagesContainer>
      <ImageList
        sx={{ maxWidth: '100%', maxHeight: '100%' }}
        cols={3}
        rowHeight="auto"
      >
        <PhotoProvider>
          {files.map((file, index) => (
            <FilePreview key={index} file={file} />
          ))}
        </PhotoProvider>
      </ImageList>
    </ImagesContainer>
  ) : (
    <EmptyOverlayContainer>
      <CustomNoRowsOverlay />
    </EmptyOverlayContainer>
  );
}
