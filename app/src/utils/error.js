export const assertValidPath = (host, space, path) => {
  if (!host || !space) handleInvalidPath(path);
};

// TODO: Create error state, handler, toast
export const handleInvalidPath = (path) => {
  console.log('Invalid path ', path);
  // debugger;
  throw new Error('Invalid path');
};
