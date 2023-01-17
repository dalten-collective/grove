// import { logLarge } from '../utils';
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
  console.log('urbit event from sub: ', evt);
  switch (evt.face) {
    case events.TROVE.INITIAL_STATE.FACE:
    case events.NODE.ADD.FACE:
    case events.NODE.REM.FACE:
    // edit either the title, description or both of a file
    case events.NODE.EDIT.FACE:
    // TODO: handle both adds and remove facts
    case events.NODE.MOVE.FACE:
    // move a file from here to there
    case events.FOLDER.ADD.FACE:
    // { space: evt.space || evt.fact?.space }
    case events.FOLDER.REM.FACE:
    // delete a folder and its subfolders
    case events.FOLDER.MOVE.FACE:
      // TODO: handle both adds and remove facts
      // move a folder from this container to that, adjusts its permissions
      return handleEventActions(
        evt,
        storeActions,
        { urbit, src: evt.face, action },
        evt
      );
    // TODO: handle facts for repeat, reperm
    // case events.REPEAT: return;
    // case events.REPERM: return;
    default: {
      // TODO: Handle other events and errors
      console.log('=====================');
      console.log('Unhandled event: ', evt);
      // throw new Error('Unhandled event');
      console.log('=====================');
      break;
    }
  }
};

// TODO: We could really use async middleware here.
