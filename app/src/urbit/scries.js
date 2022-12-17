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

export const scries = {
  troveState: (urbit, options) => getTroveState(urbit, options),
  hosts: (urbit, options) => getHosts(urbit, options),
  folder: (urbit, options) => getFolder(urbit, options),
  teams: (urbit, options) => getTeams(urbit, options),
  team: (urbit, options) => getTeam(urbit, options),
  regs: (urbit, options) => getRegs(urbit, options),
  perms: (urbit, options) => getPerms(urbit, options),
  tree: (urbit, options) => getTree(urbit, options),
  treeAtPath: (urbit, options) => getTreeAtPath(urbit, options),
  // node: cb => cb(getNode),
};

export const formScry = (path, args) => ({
  app: 'trove',
  path,
  ...args,
});

export const getTroveState = async (
  urbit,
  { src = 'NO_SRC', ...args } = {}
) => {
  try {
    const data = await urbit.scry(formScry(PATHS.STATE, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getHosts = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.HOSTS, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getFolder = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.FOLDER, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeams = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.TEAMS, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeam = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.TEAM, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getRegs = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.REGS, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPerms = async (urbit, { src = 'NO_SRC', ...args } = {}) => {
  try {
    const data = await urbit.scry(formScry(PATHS.PERMS, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTree = async (
  urbit,
  { host, space, src = 'NO_SRC', ...args } = {}
) => {
  const treePath = getTreePath(host, space);
  try {
    const data = await urbit.scry(formScry(treePath, args));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTreeAtPath = async (urbit) => {
  try {
    const data = await urbit.scry(PATHS.TREE_AT_PATH);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Take urbit instance & an optional callback, and execute scry.
// This will be where we update the store with the new state.
export const scriesWithCb = {
  troveState: (urbit, options) => scryWithCb(urbit, getTroveState, options),
  hosts: (urbit, options) => scryWithCb(urbit, getHosts, options),
  folder: (urbit, options) => scryWithCb(urbit, getFolder, options),
  teams: (urbit, options) => scryWithCb(urbit, getTeams, options),
  team: (urbit, options) => scryWithCb(urbit, getTeam, options),
  regs: (urbit, options) => scryWithCb(urbit, getRegs, options),
  perms: (urbit, options) => scryWithCb(urbit, getPerms, options),
  tree: (urbit, options) => scryWithCb(urbit, getTree, options),
  treeAtPath: (urbit, options) => scryWithCb(urbit, getTreeAtPath, options),
};

// Only used when importing scriesWithCb
export const scryWithCb = async (urbit, _scry, { cb = cl, ...options }) => {
  try {
    const res = await _scry(urbit, { ...options });
    return cb(res);
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
