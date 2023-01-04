import { assertValidPath } from './error';

export const getFragsAndAssertPath = (path) => {
  const frags = path.slice().split('/');
  // debugger;
  assertValidPath(frags[0], frags[1], path);
  return frags;
};

export const getHostSpaceFromSearchParams = (url) => {
  const searchParams = new URLSearchParams(url);
  const hostSpace = searchParams.get('spaceId');
  // debugger;
  return hostSpace;
};
