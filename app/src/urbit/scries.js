const BASE_CMD = `.^(json %gx /=trove=`;

export const PATHS = {
  GET_ALL: `/state`,
  GET_HOSTS: `/hosts`,
  GET_TEAM: `/team/(scot %p our)/(scot %t 'our')`,
  GET_TEAMS: `/teams`,
  GET_REGS: `/regs/(scot %p our)/(scot %t 'our')`,
  GET_PERMS: `/folder/perms/(scot %p our)/(scot %t 'our')`,
  GET_FOLDER: `/folder/(scot %p our)/(scot %t 'our')`,
  // GET_NODE: `${BASE_CMD}/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`,
};

export const getEverything = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.GET_ALL);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getHosts = async (urbit) => {
  try {
    const data = await scry(urbit, PATHS.GET_HOSTS);
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

// scries `.^(json %gx /=trove=/state/json)
// .^(json %gx /=trove=/hosts/json)
// .^(json %gx /=trove=/team/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/teams/json)
// .^(json %gx /=trove=/regs/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/perms/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/folder/(scot %p our)/(scot %t 'our')/json)
// .^(json %gx /=trove=/node/(scot %p our)/(scot %t 'our')/(scot %uv 0v5.a7f3d.8a2rd.ro62i.a8niq.sb782)/test/json)`;
