import { getTreePath } from '../utils';

const BASE_CMD = `.^(json %gx /=trove=`;

export const PATHS = {
  STATE: `/state`,
  HOSTS: `/hosts`,
  TEAM: `/team/(scot %p our)/(scot %t 'our')`,
  TEAMS: `/teams`,
  REGS: `/regs/(scot %p our)/(scot %t 'our')`,
  PERMS: `/folder/perms/(scot %p our)/(scot %t 'our')`,
  FOLDER: `/folder/(scot %p our)/(scot %t 'our')`,
  TREE: `/tree/~host/space`,
  TREE_AT_PATH: `/tree/~host/space/path`,
  // NODE: `/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`,
};

// Take urbit instance & an optional callback, and execute scry.
// This will be where we update the store with the new state.
export const scries = {
  state: (urbit, options) => handleScry(urbit, getState, options),
  hosts: (urbit, options) => handleScry(urbit, getHosts, options),
  folder: (urbit, options) => handleScry(urbit, getFolder, options),
  teams: (urbit, options) => handleScry(urbit, getTeams, options),
  team: (urbit, options) => handleScry(urbit, getTeam, options),
  regs: (urbit, options) => handleScry(urbit, getRegs, options),
  perms: (urbit, options) => handleScry(urbit, getPerms, options),
  tree: (urbit, options) => handleScry(urbit, getTree, options),
  treeAtPath: (urbit, options) => handleScry(urbit, getTreeAtPath, options),
  // node: handler => handler(getNode),
};

export const handleScry = async (urbit, _scry, { handler = cl, args = {} }) => {
  try {
    const res = await _scry(urbit, args);
    return handler(res);
  } catch (err) {
    console.error(err);
  }
};

export const scry = async (args, { urbit, src = 'NO_SRC' }) => {
  try {
    const data = await urbit.scry({ app: 'trove', ...args });
    // console.log(`${path} scry args: `, args);
    console.log(`${src} scry data: `, data);

    // debugger;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getState = async (urbit, { handler = setFull } = {}) => {
  try {
    const data = await scry({ path: PATHS.STATE }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getHosts = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.HOSTS }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getFolder = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.FOLDER }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeams = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.TEAMS }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeam = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.TEAM }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getRegs = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.REGS }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPerms = async (urbit) => {
  try {
    const data = await scry({ path: PATHS.PERMS }, { urbit });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTree = async (urbit, { host, space, folder } = {}) => {
  const treePath = getTreePath(host, space, folder);
  try {
    const data = await scry(urbit, treePath);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTreeAtPath = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.TREE_AT_PATH);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const cl = console.log;

// scries `.^(json %gx /=trove=/state/json)
// .^(json %gx /=trove=/hosts/json)
// .^(json %gx /=trove=/team/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/teams/json)
// .^(json %gx /=trove=/regs/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/perms/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`;
