import urbitAPI from "./urbitAPI";

export function scryState() {
  return urbitAPI.scry({
    app: 'trove',
    path: "/state"
  }).then((r) => {
    console.log('scry r ', r)
    return r
  })
}

export function addNode(space, file) {
  const json = {
    space,
    poke: {
      'add-node': {
        trail: file.trail,
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

export function addFolder(space, folder) {
  const json = {
    space,
    poke: {
      'add-folder': {
        trail: folder.trail,
        nam: folder.name,
        pur: null,
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
