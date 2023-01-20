import urbitAPI from "./urbitAPI";

export function addNode(space, file) {
  const json = {
    space,
    poke: {
      'add-node': {
        trail: '/', // TODO:
        node: {
          url: file.url,
          dat: {
            from: 1234,
            by: '~zod',
            title: file.name,
              description: 'some description',
              extension: file.extension
          }
        }
      }
    }
  }
  return urbitAPI
    .poke({
      app: 'trove',
      mark: 'trove-action',
      json
    })
    .then((r) => {
    });
}

export function closeAirlock(subscription: number, onClose) {
  urbitAPI.unsubscribe(subscription).then(() => {
    onClose;
  });
}
