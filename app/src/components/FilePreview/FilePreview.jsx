import React, { useState } from 'react';
// import styled from 'styled-components';
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {
  RiFolder2Line,
  RiFileUnknowLine,
  RiFilePdfLine,
  RiFolderZipLine,
  RiMarkdownLine,
} from 'react-icons/ri';

import { getFileTypeExhaustive, getIsImage } from '../../utils/files';
import { previewStyles, docStyles } from './styles';
import { useStore } from '../../state/store';
import { DISPLAY_NON_IMAGE_FILES_IN_GALLERY } from '../../utils/config';
// import useFileUpload from 'landscape-apps/dist/src/logic/useFileUpload';

export const FilePreview = ({ file }) => {
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  const showSingleItemPreview = useStore((state) => state.showSingleItemPreview);
  const previewSingleItem = useStore((state) => state.previewSingleItem);
  const fileType = getFileTypeExhaustive(file);
  const isImage = getIsImage(fileType);
  const preview = previewImages[fileType.toLowerCase()];
  // const fileUpload = useFileUpload();

  const handleClick = (evt, path, fileType) => {
    if (evt.detail === 1) return;
    if (evt.detail === 2) {
      if (fileType === 'folder') setSelectedPath(path);
      else previewSingleItem(path);
    }
  };

  return isImage ? (
    <PhotoView src={file.url}>
      <img
        src={file.url}
        style={previewStyles}
        onClick={(evt) => handleClick(evt, file.path, file.type)}
        alt={file.name}
      />
    </PhotoView>
  ) : (
    <NonImageDisplayGate
      handleClick={(evt) => handleClick(evt, file.path, file.type)}
      file={file}
      preview={preview}
    />
  );
};

export const NonImageDisplayGate = ({
  file,
  preview: { supported, _render },
  handleClick,
}) => {
  return DISPLAY_NON_IMAGE_FILES_IN_GALLERY ? (
    supported ? (
      _render({
        style: docStyles,
        size: 50,
        onClick: (evt) => handleClick(evt, file.path, file.type),
      })
    ) : (
      <RiFileUnknowLine
        style={docStyles}
        size={50}
        onClick={(evt) => handleClick(evt, file.path, file.type)}
      />
    )
  ) : null;
};

export const previewImages = {
  folder: { supported: true, _render: (props) => <RiFolder2Line {...props} /> },
  pdf: { supported: true, _render: (props) => <RiFilePdfLine {...props} /> },
  zip: { supported: true, _render: (props) => <RiFolderZipLine {...props} /> },
  md: { supported: true, _render: (props) => <RiMarkdownLine {...props} /> },
  unknown: {
    supported: true,
    _render: (props) => <RiFileUnknowLine {...props} />,
  },
};
