export const getHostSpaces = (hostSpaces) => {
  return hostSpaces.map((hostSpace) => {
    return getHostSpace(hostSpace);
  });
};

export const getHostSpace = (hostSpace) => {
  const hostSpaces = hostSpace?.slice()?.split('/') || [];
  const isFullHostSpace = hostSpaces?.length > 1;
  return isFullHostSpace ? [...hostSpaces, true] : [hostSpaces[0], 'our', false];
};
