export const HOST_SPACE_SEPARATION = false;

export const getHostSpaceShape = ({ host, space }) =>
  !HOST_SPACE_SEPARATION ? (space ? `${host}/${space}` : host) : { host: {} };
