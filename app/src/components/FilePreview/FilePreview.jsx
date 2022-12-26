import React, { useState } from 'react';
import { PhotoView } from 'react-photo-view';
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

export const FilePreview = ({ file }) => {
  const setSelectedPath = useStore((state) => state.setSelectedPath);
  const fileType = getFileTypeExhaustive(file);
  const isImage = getIsImage(fileType);
  const preview = previewImages[fileType.toLowerCase()];

  const handleClick = (evt, path) => {
    if (evt.detail === 1) return;
    if (evt.detail === 2) setSelectedPath(path);
  };

  return isImage ? (
    <PhotoView src={file.url}>
      <img
        src={file.url}
        style={previewStyles}
        onClick={(evt) => handleClick(evt, file.path)}
        alt={file.name}
      />
    </PhotoView>
  ) : (
    <NonImageDisplayGate
      handleClick={handleClick}
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
        onClick: (evt) => handleClick(evt, file.path),
      })
    ) : (
      <RiFileUnknowLine
        style={docStyles}
        onClick={(evt) => handleClick(evt, file.path)}
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
