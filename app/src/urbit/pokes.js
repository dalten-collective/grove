import { getSpace, mapTilde } from './utils';

// export const poke = async (urbit, pokePath) =>
//   await urbit.poke({
//     ...folder.add(urbit, space, data, ship),
//   });

export const pokes = {
  folder: {
    add: async (urbit, space, data, ship) =>
      await urbit.poke({ ...folder.add(urbit, space, data, ship) }),
    rem: async (urbit, space, data, ship) =>
      await urbit.poke({ ...folder.rem(urbit, space, data, ship) }),
    move: async (urbit, space, data, ship) =>
      await urbit.poke({ ...folder.move(urbit, space, data, ship) }),
  },
  node: {
    add: async (urbit, space, data, ship) =>
      await urbit.poke({ ...node.add(urbit, space, data, ship) }),
    rem: async (urbit, space, data, ship) =>
      await urbit.poke({ ...node.rem(urbit, space, data, ship) }),
    edit: async (urbit, space, data, ship) =>
      await urbit.poke({ ...node.edit(urbit, space, data, ship) }),
    move: async (urbit, space, data, ship) =>
      await urbit.poke({ ...node.move(urbit, space, data, ship) }),
  },
  moderators: {
    add: async (urbit, space, data, ship) =>
      await urbit.poke({ ...moderators.add(urbit, space, data, ship) }),
    rem: async (urbit, space, data, ship) =>
      await urbit.poke({ ...moderators.rem(urbit, space, data, ship) }),
  },
  errata: {
    repeat: async (urbit, space, data, ship) =>
      await urbit.poke({ ...errata.repeat(urbit, space, data, ship) }),
    reperm: async (urbit, space, data, ship) =>
      await urbit.poke({ ...errata.reperm(urbit, space, data, ship) }),
    rehome: async (urbit, space, data, ship) =>
      await urbit.poke({ ...errata.rehome(urbit, space, data, ship) }),
  },
};

export const folder = {
  add: buildPoke('add-folder', space, data, ship),
  rem: buildPoke('rem-folder', space, data, ship),
  move: buildPoke('move-folder', space, data, ship),
};

export const node = {
  add: buildPoke('add-node', space, data, ship),
  rem: buildPoke('rem-node', space, data, ship),
  edit: buildPoke('edit-node', space, data, ship),
  move: buildPoke('move-node', space, data, ship),
};

export const moderators = {
  add: buildPoke('add-moderators', space, data, ship),
  rem: buildPoke('rem-moderators', space, data, ship),
};

export const errata = {
  repeat: buildPoke('repeat', space, data, ship),
  reperm: buildPoke('reperm', space, data, ship),
  rehome: buildPoke('rehome', space, data, ship),
};

export const buildPoke =
  (type, space, data, ship = '') =>
  (urbit, space, data, ship) => ({
    app: 'trove',
    mark: 'trove-action',
    space: getSpace(space, ship),
    poke: {
      [type]: structurePokeData(type, data),
      onSucccess: console.log,
      onError: console.log,
    },
  });

// TODO: Add type checking
const structurePokeData = (type, data) => {
  switch (type) {
    // Folder
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
