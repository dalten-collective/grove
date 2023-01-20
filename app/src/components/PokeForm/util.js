export const getLeadingSlash = (path) => {
  return path.startsWith('/') ? path : `/${path}`;
};

export const getActionStructure = (action) => {
  const [predicate, noun] = action?.slice().split('-');
  return [predicate, noun];
};
export const getSelectedSpace = (path, selectedHostSpace) => {
  if (path.includes(window.ship)) {
    return path.includes('our') ? 'our' : selectedHostSpace;
  }
  return selectedHostSpace;
};
