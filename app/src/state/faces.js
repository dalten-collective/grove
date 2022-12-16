export const events = {
  NODE: {
    ADD: { FACE: 'NODE_ADD' },
    REM: { FACE: 'NODE_REM' },
    EDIT: { FACE: 'NODE_EDIT' },
    MOVE: { FACE: 'NODE_MOVE' },
  },
  FOLDER: {
    ADD: { FACE: 'FOLDER_ADD', ACT: 'fetchTree' },
    REM: { FACE: 'FOLDER_REM' },
    MOVE: { FACE: 'FOLDER_MOVE' },
  },
  MODERATORS: {
    ADD: { FACE: 'MODERATORS_ADD' },
    REM: { FACE: 'MODERATORS_REM' },
  },
  TROVE: {
    NEW: { FACE: 'TROVE_NEW' },
  },
  // REPERM: { FACE: 'REPERM' },
  // REPEAT: { FACE: 'NODE_ADD' },
};
