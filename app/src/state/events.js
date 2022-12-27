import { logLarge } from '../utils';
import { events } from './faces';

export const handleEventActions = (
  evt,
  storeActions,
  { urbit, src = evt.face },
  args
) => {
  return Promise.all([
    storeActions.onFact[evt.face].forEach((fn) =>
      Promise.resolve(fn(urbit, { src, ...args }))
    ),
  ]);
};

export const handleEvent = (urbit, storeActions) => (evt, action) => {
  logLarge('urbit event from sub: ', evt);
  // return handleEventActions(evt, storeActions, { urbit, action }, evt);
  switch (evt.face) {
    case events.TROVE.INITIAL_STATE.FACE:
      return handleEventActions(
        evt,
        storeActions,
        { urbit, src: evt.face },
        evt
      );
    case events.NODE.ADD.FACE:
      return handleEventActions(evt, storeActions, { urbit }, evt);
    case events.NODE.REM.FACE:
      return handleEventActions(evt, storeActions, { urbit }, evt);
    case events.NODE.EDIT.FACE:
      // edit either the title, description or both of a file
      return handleEventActions(evt, storeActions, { urbit }, evt);
    // TODO: handle both adds and remove facts
    case events.NODE.MOVE.FACE:
      // move a file from here to there
      return handleEventActions(evt, storeActions, { urbit }, evt);
    case events.FOLDER.ADD.FACE:
      // { space: evt.space || evt.fact?.space }
      return handleEventActions(evt, storeActions, { urbit }, evt);
    case events.FOLDER.REM.FACE:
      // delete a folder and its subfolders
      return handleEventActions(evt, storeActions, { urbit }, evt);
    // TODO: handle both adds and remove facts
    case events.FOLDER.MOVE.FACE:
      // move a folder from this container to that, adjusts its permissions
      return handleEventActions(evt, storeActions, { urbit }, evt);
    // TODO: handle facts for repeat, reperm
    // case events.REPEAT: return;
    // case events.REPERM: return;
    default: {
      console.log('=====================');
      console.log('=====================');
      logLarge('Unhandled event: ', evt);
      console.log('=====================');
      console.log('=====================');
      debugger;
      break;
    }
  }
};

// TODO: We could really use async middleware here.
