import keyBy from 'lodash/keyBy';
// import { unix } from 'moment/moment';

export const getSpace = (space, ship = '') => {
  if (space[0] === '~') return space;
  return ship.length ? `~${ship}/${space}` : `~${space}`;
};

export const mapTilde = (ships = []) => ships.map(addTilde);

// Maybe add tilde
export const addTilde = (ship) => {
  if (ship[0] === '~') {
    return ship;
  }
  return `~${ship}`;
};

export const removeTilde = (ship) => (ship[0] === '~' ? ship.slice(1) : ship);

export const getDateUploaded = (file) =>
  file.dat?.from
    ? getDateTime(file.dat.from)
    : file.dateUploaded
    ? getDateTime(file.dateUploaded)
    : '';

export const getDateTime = (timeStamp) =>
  new Date(timeStamp * 1000).toLocaleString();

export const getTreePath = (host, space, fact) => {
  if (!host && !space && !fact?.space) {
    throw new Error('getTree requires a host or space');
  }
  if (fact?.space) {
    return `/tree/${fact.space}`;
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
