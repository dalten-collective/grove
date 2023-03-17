import urbitAPI from "./urbitAPI";

export function scryState() {
  return urbitAPI.scry({
    app: 'grove',
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
      app: 'grove',
      mark: 'grove-action',
      json
    })
    .then((r) => {
    });
}

export function deleteNode(space, trail, id) {
  const json = {
    space,
    poke: {
      'rem-node': {
        id,
        trail
      }
    }
  }
  return urbitAPI
    .poke({
      app: 'grove',
      mark: 'grove-action',
      json
    })
    .then((r) => {
    });
}

export function deleteFolder(space, trail) {
  const json = {
    space,
    poke: {
      'rem-folder': trail,
    }
  }
  return urbitAPI
    .poke({
      app: 'grove',
      mark: 'grove-action',
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
      app: 'grove',
      mark: 'grove-action',
      json
    })
    .then((r) => {
      return r
    });
}

export function moveNode(space, id, fromTrail, toTrail) {
  const json = {
    space,
    poke: {
      'move-node': {
        id,
        from: fromTrail,
        to: toTrail
      }
    }
  }
  return urbitAPI
    .poke({
      app: 'grove',
      mark: 'grove-action',
      json
    })
    .then((r) => {
    });
}

export function moveFolder(space, fromTrail, toTrail) {
  const json = {
    space,
    poke: {
      'move-folder': {
        from: fromTrail,
        to: toTrail
      }
    }
  }
  return urbitAPI
    .poke({
      app: 'grove',
      mark: 'grove-action',
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
