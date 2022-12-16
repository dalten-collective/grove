import { logLarge } from '../utils';
import { events } from './faces';

export const handleEvent = (urbit, storeActions) => (evt, action) => {
  logLarge('urbit event from sub: ', evt);
  // return handleEventAction(evt, storeActions, { urbit, action });
  switch (evt.face) {
    case events.NODE.ADD:
      // add a file to a folder
      return handleEventAction(evt, storeActions, action);
    case events.NODE.REM:
      // remove a file from a folder
      return handleEventAction(evt, storeActions, action);
    case events.NODE.UPD:
      // edit either the title, description or both of a file
      return handleEventAction(evt, storeActions, action);
    // TODO: handle both adds and remove facts
    case events.NODE.MOVE:
      // move a file from here to there
      return handleEventAction(evt, storeActions, action);
    case events.FOLDER.ADD:
      logLarge('Add folder evt: ', evt);
      debugger;
      return storeActions.onFact[evt.face](
        { space: evt.space },
        { urbit, src: evt.face }
      );
    // return handleEventAction(evt, storeActions, action);
    case events.FOLDER.REM:
      // delete a folder and its subfolders
      return handleEventAction(evt, storeActions, action);
    // TODO: handle both adds and remove facts
    case events.FOLDER.MOVE:
      // move a folder from this container to that, adjusts its permissions
      return handleEventAction(evt, storeActions, action);
    // TODO: handle facts for repeat, reperm
    // case events.REPEAT: return;
    // case events.REPERM: return;
    default: {
      logLarge('Unhandled event: ', evt);
      debugger;
      break;
    }
  }
};

export const handleEventAction = (evt, storeActions, action) => {
  // handle an urbit evt
  switch (evt.type) {
    case 'FACT':
      // TODO: We could really use async middleware here.
      return storeActions.onFact[evt.face](urbit);
    // return; // on fact, update store with new state
    case 'SCRY':
      return; // on scry, request state from urbit
    case 'POKE':
      return; // on poke, send a poke to urbit
  }
};
