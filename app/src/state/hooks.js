import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSelectedPaths, getSetSelectedPath } from './selectors';
import { useStore } from './store';

export const useSwitchSpaceOnSearch = () => {
  const location = useLocation();
  const matchPaths = useStore(getSelectedPaths);
  const setSelectedPath = useStore(getSetSelectedPath);

  useEffect(() => {
    const newPath = getNewPath(location.search, matchPaths);
    newPath && setSelectedPath(newPath);
  }, [location.search]);
};

const getNewPath = (search, matchPaths) => {
  const [space, hostSpace] = getSpaceFromSearch(search);
  return space && !matchesSpace(hostSpace, matchPaths) ? hostSpace : null;
};

const matchesSpace = (query, [selectedHostSpace, selectedPath]) => {
  if (selectedPath?.includes(query)) return true;
  if (selectedHostSpace?.includes(query)) return true;
  return false;
};

const getSpaceFromSearch = (search) => {
  const space = search
    ? new URLSearchParams(search)?.get('spaceId')?.slice(1)
    : null;
  const hostSpace = space?.slice().split('/').slice(0, 2).join('/');
  return [space, hostSpace];
};
