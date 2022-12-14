import get from 'lodash.get';

function subscribeToUrbitEvents() {
  // subscribe to urbit events here
}

const events = {
  NODE: {
    ADD: 'add.node',
    REM: 'rem.node',
    EDIT: 'upd.node',
    MOVE: 'move.node',
  },
  FOLDER: {
    ADD: 'add.folder',
    REM: 'rem.folder',
    MOVE: 'move.folder',
  },
  REPEAT: 'repeat',
  REPERM: 'reperm',
};
const matchEvent = (evt, path) => get(evt, path, false);

// action is handlerType of 'fact' | 'scry' | 'poke'
const handleEventAction = (evt, action) => {
  // handle an urbit evt
  switch (action) {
    case 'fact':
      return; // on fact, update store with new state
    case 'scry':
      return; // on scry, request state from urbit
    case 'poke':
      return; // on poke, send a poke to urbit
  }
};
const handleEvent = (evt, action) => {
  // handle an urbit evt
  switch (evt) {
    case matchEvent(evt, events.NODE.ADD):
      // add a file to a folder
      return handleEventAction(evt, action);
    case matchEvent(evt, events.NODE.REM):
      // remove a file from a folder
      return handleEventAction(evt, action);
    case matchEvent(evt, events.NODE.UPD):
      // edit either the title, description or both of a file
      return handleEventAction(evt, action);
    // TODO: handle both adds and remove facts
    case matchEvent(evt, events.NODE.MOVE):
      // move a file from here to there
      return handleEventAction(evt, action);
    case matchEvent(evt, events.FOLDER.ADD):
      // add a folder to the system (with an empty map of files), maybe permissioned
      return handleEventAction(evt, action);
    case matchEvent(evt, events.FOLDER.REM):
      // delete a folder and its subfolders
      return handleEventAction(evt, action);
    // TODO: handle both adds and remove facts
    case matchEvent(evt, events.FOLDER.MOVE):
      // move a folder from this container to that, adjusts its permissions
      return handleEventAction(evt, action);
    // TODO: handle facts for repeat, reperm
    case matchEvent(evt, events.REPEAT):
    case matchEvent(evt, events.REPERM):
  }
};

// function handleScry(scry) {
//   // handle a urbit scry
//   switch (scry.mark) {
//     case '/x/state/json':
//       // return the state, as on initial subscription
//       break;
//     case '/x/hosts/json':
//       // return all spaces you know about that may or may not have active troves
//       break;
//     case '/x/team/<host-ship>/<space-name>/json':
//       // return information about a specific team
//       break;
//     case '/x/teams/json':
//       // return all teams you know about
//       break;
//   }
// }
