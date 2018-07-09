import * as constants from '../constants';
import * as types from '../types';

const initialState: types.TasklistListState = {
  ids: [],
  tasklistsById: {},
  isFetching: false,
  isInitialized: false,
  selectedId: -1
};

const tasklistList = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLISTS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKLISTS_FETCH_SUCCESS:
      return {
        ...state,
        ids: action.payload.ids,
        tasklistsById: action.payload.tasklistsById,
        isFetching: false,
        isInitialized: true
      };

    case constants.TASKLIST_CREATE_SUCCESS:
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
        tasklistsById: {
          ...action.payload.tasklistById,
          ...state.tasklistsById
        }
      };

    default:
      return state;
  }
};

// SELECTOR
const getTaskLists = ({ ids, tasklistsById }: types.TasklistListState) => {
  return ids.map((id: any) => tasklistsById[id]);
};

const getSelectedTaskList = ({ selectedId, tasklistsById }: types.TasklistListState) => {
  return tasklistsById[selectedId];
};

export { tasklistList, getTaskLists, getSelectedTaskList };
