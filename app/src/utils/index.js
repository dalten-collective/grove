export const getSpace = (space, ship = '') =>
  ship.length ? `~${ship}/${space}` : `~${space}`;

export const mapTilde = (ships = []) => ships.map(addTilde);

export const addTilde = (ship) => `~${ship}`;

export const getTreePath = (host, space, folder) => {
  if (!host && !space) {
    throw new Error('getTree requires a host or space');
  }
  if (space.slice().split('/').length > 1) {
    return `/tree/${space}`;
  }
  if (host.slice().split('/').length > 1) {
    return `/tree/${host}`;
  }
  if (!space) {
    return `/tree/${host}/our`;
  }
  return `/tree/${host}/${space}`;
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
