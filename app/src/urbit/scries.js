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

// Take urbit instance & an optional callback, and execute scry.
// This will be where we update the store with the new state.
export const scries = {
  state: (urbit, handler = cl) => handleScry(urbit, getState, handler),
  hosts: (urbit, handler = cl) => handleScry(urbit, getHosts, handler),
  folder: (urbit, handler = cl) => handleScry(urbit, getFolder, handler),
  teams: (urbit, handler = cl) => handleScry(urbit, getTeams, handler),
  team: (urbit, handler = cl) => handleScry(urbit, getTeam, handler),
  regs: (urbit, handler = cl) => handleScry(urbit, getRegs, handler),
  perms: (urbit, handler = cl) => handleScry(urbit, getPerms, handler),
  // node: handler => handler(getNode),
};

export const handleScry = async (urbit, _scry, handler) => {
  try {
    const res = await _scry(urbit);
    return handler(res);
  } catch (err) {
    console.error(err);
  }
};

export const scry = async (urbit, path) => {
  try {
    const data = await urbit.scry({ app: 'trove', path });
    console.log(`${path} scry: `, data);

    // debugger;
    return data;
  } catch (err) {
    console.error(err);
  }
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

export const getFolder = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.FOLDER);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeams = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.TEAMS);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTeam = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.TEAM);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getRegs = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.REGS);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPerms = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.PERMS);
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
