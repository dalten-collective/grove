import shallow from 'zustand/shallow';
import { events } from './faces';
import { getShipName } from '../utils';

// const [] = useStore((state) => (state.tree), shallow)

export const getSelectedPath = (state) => state.selectedPath;
export const getSelectedHostSpace = (state) => state.selectedHostSpace;

export const getSelectedPaths = (state) => [
  state.selectedHostSpace,
  state.selectedPath,
];

export const getSetSelectedPath = (state) => state.setSelectedPath;

export const getShorthandHost = (state) => getShipName(state.selectedTrove.host);

export const getTree = (state) =>
  state.hosts.length && state.troves[state.hosts[0]]?.tree;
// Object.values(state.troves) && Object.values(state.troves)[0]?.tree;

export const getTrees = (state) =>
  state.hosts.length ? state.hosts.map((host) => state.troves[host]?.tree) : [];

export const getTreeAtSelectedSpace = (state) =>
  state.troves[state.selectedHostSpace]?.tree;
export const getLookupTableAtSelectedSpace = (state) =>
  state.lookupTable[state.selectedHostSpace];

export const getLookupTableAtSelectedPath = (state) =>
  state.lookupTable[state.selectedPath];
// export const getDateUploaded = (state) =>

// TODO: Check all of these effects are passing the correct arguments.
export const getActions = (state) => ({
  onFact: {
    [events.TROVE.INITIAL_STATE.FACE]: [state.setTroves],
    [events.TROVE.NEW.FACE]: [state.newTrove],

    [events.NODE.ADD.FACE]: [state.fetchTree],
    [events.NODE.REM.FACE]: [state.setPathOneLevelUp, state.remNode],
    [events.NODE.EDIT.FACE]: [state.setPathOneLevelUp, state.editNode],
    // [events.NODE.MOVE.FACE]: [state.moveNode],
    [events.FOLDER.ADD.FACE]: [state.fetchTree],
    [events.FOLDER.REM.FACE]: [state.getNewPathOnFact, state.fetchTree],
    [events.FOLDER.MOVE.FACE]: [state.getNewPathOnFact, state.fetchTree],

    [events.MODERATORS.ADD.FACE]: [state.addModerators],
    [events.MODERATORS.REM.FACE]: [state.removeModerators],
  },
});

export const getScryActions = (state) => ({
  tree: state.fetchTree,
  troves: state.fetchTroves,
  hosts: state.fetchHosts,
  allTrees: state.fetchTreesForAllTroves,
});

export const selectors = {
  getShorthandHost,
  getTree,
  getLookupTableAtSelectedSpace,
  getLookupTableAtSelectedPath,
};
