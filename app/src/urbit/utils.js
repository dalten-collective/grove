export const getSpace = (space, ship = '') =>
  ship.length ? `~${ship}/${space}` : `~${space}`;

export const mapTilde = (ships = []) => ships.map(addTilde);

export const addTilde = (ship) => `~${ship}`;
