export const getSubscription = (urbit) =>
  urbit.subscribe({
    ...subscription,
    ship: urbit.ship,
  });

export const subscription = {
  app: 'trove',
  path: '/web-ui',
  ship: window?.ship || '',
  err: console.error,
  event: console.log,
  quit: console.error,
};
