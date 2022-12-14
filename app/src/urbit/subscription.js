export const getSubscription = (urbit, eventHandler = console.log) =>
  urbit.subscribe({
    ...subscription,
    ship: urbit.ship,
    event: eventHandler,
  });

export const subscription = {
  app: 'trove',
  path: '/web-ui',
  ship: window?.ship || '',
  err: console.error,
  event: console.log,
  quit: console.error,
};
