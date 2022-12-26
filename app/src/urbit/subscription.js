export const getSubscription = (urbit, eventHandler = console.log) =>
  urbit.subscribe({
    ...subscription,
    ship: urbit.ship,
    event: eventHandler,
  });

export const subscription = {
  app: 'trove',
  path: '/web-ui',
  // ship: window?.ship || '',
  // ship: 'ranrud-navdep-danlyd-bitwep--soptyr-misdul-hatmut-marzod',
  // url: 'localhost:808',
  // code: 'lapfus-fanryn-saltyd-siprel',
  verbose: true,
  err: console.error,
  event: console.log,
  quit: console.error,
};
