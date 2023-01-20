import { addTilde, getSpace, mapTilde } from '../utils';

// TODO: Remoe deleted folders and nodes from local storage
export const poke = async (urbit, space, data, ship, pokeObj) => {
  try {
    const formedPoke = pokeObj(space, data, ship);
    // console.log('====================================');
    console.log('formedPoke: ', formedPoke);
    // console.log('====================================');
    const response = await urbit.poke(formedPoke);
    // console.log('====================================');
    console.log('Poke Response: ', response);
    // console.log('====================================');
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const buildPoke = (type, space, data, ship = '') => ({
  app: 'trove',
  mark: 'trove-action',
  json: {
    space: getSpace(space, ship),
    poke: {
      [type]: structurePokeData(type, data),
    },
  },
  onSucccess: console.log,
  onError: console.log,
});

export const pokes = {
  folder: {
    add: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, folder.add),
    rem: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, folder.rem),
    move: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, folder.move),
  },
  node: {
    add: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, node.add),
    rem: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, node.rem),
    edit: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, node.edit),
    move: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, node.move),
  },
  moderators: {
    add: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, moderators.add),
    rem: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, moderators.rem),
  },
  errata: {
    repeat: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, errata.repeat),
    reperm: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, errata.reperm),
    rehome: async (urbit, space, data, ship) =>
      await poke(urbit, space, data, ship, errata.rehome),
  },
};

export const folder = {
  add: (space, data, ship) => buildPoke('add-folder', space, data, ship),
  rem: (space, data, ship) => buildPoke('rem-folder', space, data, ship),
  move: (space, data, ship) => buildPoke('move-folder', space, data, ship),
};

export const node = {
  add: (space, data, ship) => buildPoke('add-node', space, data, ship),
  rem: (space, data, ship) => buildPoke('rem-node', space, data, ship),
  edit: (space, data, ship) => buildPoke('edit-node', space, data, ship),
  move: (space, data, ship) => buildPoke('move-node', space, data, ship),
};

export const moderators = {
  add: (space, data, ship) => buildPoke('add-moderators', space, data, ship),
  rem: (space, data, ship) => buildPoke('rem-moderators', space, data, ship),
};

export const errata = {
  repeat: (space, data, ship) => buildPoke('repeat', space, data, ship),
  reperm: (space, data, ship) => buildPoke('reperm', space, data, ship),
  rehome: (space, data, ship) => buildPoke('rehome', space, data, ship),
};

// TODO: Add type checking
const structurePokeData = (type, data) => {
  switch (type) {
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
      return fromPath;
    }
    case 'move-folder': {
      const { fromPath, toPath } = data;
      return { from: fromPath, to: toPath };
    }
    case 'add-node': {
      const { toPath, url, name, description, extension, from, by } = data;
      return {
        trail: toPath,
        node: {
          url,
          dat: {
            title: name,
            description,
            extension,
            from,
            by: addTilde(by),
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
