export const HOST_SPACE_SEPARATION = false;

export const getHostSpaceShape = ({ host, space, fact }) => {
  if (fact && fact.space) return fact.space;
  return !HOST_SPACE_SEPARATION
    ? space
      ? `${host}/${space}`
      : host
    : { host: {} };
};
