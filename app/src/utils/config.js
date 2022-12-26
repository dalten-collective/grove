export const HOST_SPACE_SEPARATION = false;

export const PREFER_DERIVED_FILE_TYPE = true;

export const DISPLAY_NON_IMAGE_FILES_IN_GALLERY = true;

export const getHostSpaceShape = ({ host, space, fact }) => {
  if (fact && fact.space) return fact.space;
  return !HOST_SPACE_SEPARATION
    ? space
      ? `${host}/${space}`
      : host
    : { host: {} };
};
