import React from 'react';
import styled from 'styled-components';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ImageList from '@mui/material/ImageList';
import 'react-photo-view/dist/react-photo-view.css';
import { useStore } from '../../state/store';
import { FilePreview } from './FilePreview';
import { CustomNoRowsOverlay } from '../Table/EmptyFolder';
import { testImages as images } from './testImages';
import { ImagesContainer } from './styles';

export const ImageTable = ({ files = images }) => {
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
};

export const EmptyOverlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
