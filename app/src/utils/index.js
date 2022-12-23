import keyBy from 'lodash/keyBy';
// import { unix } from 'moment/moment';

export const getSpace = (space, ship = '') =>
  ship.length ? `~${ship}/${space}` : `~${space}`;

export const mapTilde = (ships = []) => ships.map(addTilde);

// Maybe add tilde
export const addTilde = (ship) => {
  if (ship[0] === '~') {
    return ship;
  }
  return `~${ship}`;
};

export const removeTilde = (ship) => (ship[0] === '~' ? ship.slice(1) : ship);

export const getDateTime = (timeStamp) =>
  new Date(timeStamp * 1000).toLocaleString();

export const getTreePath = (host, space) => {
  if (!host && !space) {
    throw new Error('getTree requires a host or space');
  }
  if (space?.slice().split('/').length > 1) {
    return `/tree/${space}`;
  }
  if (host?.slice().split('/').length > 1) {
    return `/tree/${host}`;
  }
  if (!space) {
    return `/tree/${host}/our`;
  }
  return `/tree/${host}/${space}`;
};

export const getStateFromEvt = (evt) => {
  if (evt?.fact) return evt.fact;
  if (evt?.scry) return evt.scry;
  return evt;
};

export const getNodeName = (nodePath, key) => nodePath?.dat?.title || key;

export const getHostSpace = (hostSpace) => {
  const hostSpaces = hostSpace?.slice()?.split('/') || [];
  const isFullHostSpace = hostSpaces?.length > 1;
  return isFullHostSpace
    ? [...hostSpaces, true]
    : [hostSpaces[0], 'our', false];
};

export const getShipName = (_ship) => {
  if (_ship && _ship.length > 2) {
    const names = _ship?.slice().split('-');
    return names.length > 2
      ? addTilde(`${names[0]}-${names[names.length - 1]}`)
      : addTilde(`${_ship}`);
  }
};

export const getSpacePath = (host, space, selectedHostSpace) =>
  host && space ? `${addTilde(host)}/${space}` : selectedHostSpace;

export const getPathPills = (frags, selectedHostSpace) =>
  frags?.length
    ? [
        {
          name: getShipName(frags[0]),
          path: getSpacePath(frags[0], frags[1]),
        },
      ].concat(
        frags.slice(1).map((frag, idx) => ({
          name: frag,
          path: getSpacePath(frags[0], frags.slice(1, idx + 2).join('/')),
        }))
      )
    : [];

export const getChildPath = (fromPath, name) => {
  return `${fromPath}/${name}`;
};

export const passToMap = (obj) => {
  const map = makeMap(obj.children);
  return map;
};

export const makeMap = (children) => {
  const map = keyBy(children, (child) => Object.keys(child)[0]);
  return map;
};

export const logLarge = (key, msg) => {
  console.log(`====================================`);
  console.log(`${key}: `, msg);
  console.log(`====================================`);
};

export const nestTrovePaths = (paths) => {
  const troves = Object.values(paths).length && Object.values(paths)[0].trove;
  const nestedPaths = Object.keys(troves).reduce((result, key) => {
    const pathSegments = key.split('/').filter((s) => s);

    if (pathSegments[0] !== 'trove') {
      return {
        ...result,
        [key]: paths[key],
      };
    }

    const nested = pathSegments
      .slice(1)
      .reduce(
        (nestedPaths, segment) => ({ ...nestedPaths, [segment]: {} }),
        result
      );

    nested[pathSegments[pathSegments.length - 1]].value = paths[key];

    return nested;
  }, {});
  return nestedPaths;
};

// recurively nest child paths under children keys in parent paths
export const nestChildren = (paths) => {
  const nestedPaths = Object.keys(paths).reduce((result, key) => {
    return paths[key].value
      ? {
          ...result,
          [key]: paths[key],
        }
      : {
          ...result,
          [key]: {
            children: nestChildren(paths[key]),
          },
        };
  }, {});

  return nestedPaths;
};

// export const nestTrovePaths = (paths) => {
//   const nestedPaths = Object.keys(paths).reduce((result, key) => {
//     const pathSegments = key.split('/').filter((s) => s);
//     const nested = pathSegments.reduce(
//       (nestedPaths, segment) => ({
//         ...nestedPaths,
//         [segment]: {},
//       }),
//       {}
//     );
//     nested[pathSegments[pathSegments.length - 1]].value = paths[key];
//     return {
//       ...result,
//       ...nested,
//     };
//   }, {});
//   return nestedPaths;
// };
