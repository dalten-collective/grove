import { PREFER_DERIVED_FILE_TYPE } from './config';

// TODO: Note: users can't be relied upon to set the correct file type - nor should they.
// Derive type from title, url, or contents; hide extension input field from user.

export const getFileTypeExhaustive = (file) => {
  const type = getFileTypeIfValid(getFileType(file));
  const derivedType = getFileTypeIfValid(getDerivedFileType(file));
  return PREFER_DERIVED_FILE_TYPE
    ? preferIfValid(derivedType, type)
    : preferIfValid(type, derivedType);
};

export const getIsImage = (fileType) =>
  getExtensionByFileType(fileType)?.useUrl;

export const getFileType = (file) =>
  file.type === 'record' ? getTypeByExtension(file.dat?.extension) : 'Folder';

export const getDerivedFileType = (file) => {
  const derivedExtension = getDerivedExtension(file);
  return getTypeByExtension(`.${derivedExtension}`);
};

export const getTypeByExtension = (extension) => {
  return extension
    ? extensions[extension.toLowerCase()]?.type || 'unknown'
    : 'unknown';
};

export const getDerivedExtension = (file) => {
  return file.title?.slice().split('.').pop();
};

export const preferIfValid = (first, second) => {
  return first ? first : second ? second : 'unknown';
};

export const getFileTypeIfValid = (type) =>
  type && type !== 'unknown' ? type : null;

export const getExtensionByFileType = (fileType) =>
  extensions[`.${fileType.toLowerCase()}`];

export const extensions = {
  '.png': { type: 'png', useUrl: true },
  '.jpg': { type: 'jpg', useUrl: true },
  '.jpeg': { type: 'jpg', useUrl: true },
  '.gif': { type: 'gif', useUrl: true },
  '.pdf': { type: 'PDF', useUrl: false },
  '.txt': { type: 'txt', useUrl: false },
  '.csv': { type: 'csv', useUrl: false },
  '.xls': { type: 'xls', useUrl: false },
  '.xlsx': { type: 'xls', useUrl: false },
  '.doc': { type: 'doc', useUrl: false },
  '.docx': { type: 'doc', useUrl: false },
  '.md': { type: 'md', useUrl: false },
  '.zip': { type: 'zip', useUrl: false },
  '.rar': { type: 'zip', useUrl: false },
};
