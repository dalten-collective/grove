const BASE_CMD = `.^(json %gx /=trove=`;

export const PATHS = {
  STATE: `/state`,
  HOSTS: `/hosts`,
  TEAM: `/team/(scot %p our)/(scot %t 'our')`,
  TEAMS: `/teams`,
  REGS: `/regs/(scot %p our)/(scot %t 'our')`,
  PERMS: `/folder/perms/(scot %p our)/(scot %t 'our')`,
  FOLDER: `/folder/(scot %p our)/(scot %t 'our')`,
  // NODE: `/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`,
};

export const getState = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.STATE);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getHosts = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.HOSTS);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const scry = async (urbit, path) => {
  try {
    const data = await urbit.scry({ app: 'trove', path });
    console.log('scry data', data);
    // debugger;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createScries = (urbit, path) => {
  return async () => {
    try {
      const data = await urbit.scry({ app: 'trove', path });
      return data;
    } catch (err) {
      console.error(err);
    }
  };
};

import { getSpace, mapTilde } from './utils';

export const addFolderPoke = async (urbit, space, data, ship) =>
  await urbit.poke({
    ...folders.add(urbit, space, data, ship),
  });

export const folders = {
  add: buildPoke('add-folder', space, data, ship),
  remove: buildPoke('rem-folder', space, data, ship),
  move: buildPoke('move-folder', space, data, ship),
};

export const files = {
  add: buildPoke('add-node', space, data, ship),
  remove: buildPoke('rem-node', space, data, ship),
  edit: buildPoke('edit-node', space, data, ship),
  move: buildPoke('move-node', space, data, ship),
};

export const moderators = {
  add: buildPoke('add-moderators', space, data, ship),
  remove: buildPoke('rem-moderators', space, data, ship),
};

export const errata = {
  repeat: buildPoke('repeat', space, data, ship),
  reperm: buildPoke('reperm', space, data, ship),
  rehome: buildPoke('rehome', space, data, ship),
};

export const buildPoke =
  (type, space, data, ship = '') =>
  (space, data, ship) => ({
    app: 'trove',
    mark: 'trove-action',
    space: getSpace(space, ship),
    poke: {
      [type]: structurePokeData(type, data),
      onSucccess: console.log,
      onError: console.log,
    },
  });

const structurePokeData = (type, data) => {
  switch (type) {
    // Folders
    case 'add-folder': {
      const { toPath, name, permissions } = data;
      return {
        trail: toPath,
        nam: name,
        pur: permissions,
      };
    }
    case 'rem-folder': {
      const { fromPath } = data;
      return { trail: fromPath };
    }
    case 'move-folder': {
      const { fromPath, toPath } = data;
      return { from: fromPath, to: toPath };
    }
    case 'add-node': {
      const { toPath, url, name, description, extension } = data;
      return {
        trail: toPath,
        node: {
          url,
          dat: {
            title: name,
            description,
            extension,
          },
        },
      };
    }
    case 'rem-node': {
      const { id, fromPath } = data;
      return { id, trail: fromPath };
    }
    case 'edit-node': {
      const { id, fromPath, name, description } = data;
      return {
        id,
        trail: fromPath,
        tut: name,
        dus: description,
      };
    }
    case 'move-node': {
      const { id, fromPath, toPath } = data;
      return { id, from: fromPath, to: toPath };
    }
    case 'add-moderators':
    case 'rem-moderators': {
      const { moderators } = data;
      return mapTilde(moderators);
    }
    // TODO: type check space
    case 'repeat': {
      const { id, fromPath, space, toPath } = data;
      return {
        id,
        trail: fromPath,
        to: {
          space: getSpace(space, ''),
          trail: toPath,
        },
      };
    }
    case 'reperm': {
      const { fromPath, permissions } = data;
      return { trail: fromPath, pur: permissions };
    }
    case 'rehome': {
    }
    default: {
      return {};
    }
  }
};

// scries `.^(json %gx /=trove=/state/json)
// .^(json %gx /=trove=/hosts/json)
// .^(json %gx /=trove=/team/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/teams/json)
// .^(json %gx /=trove=/regs/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/perms/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`;
