import * as constants from '../constants';
import * as types from '../types';

const initialState: types.TasklistListState = {
  tasklistsById: {},
  selectedId: -1,
  isFetching: false
};

const tasklistList = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLIST_LIST_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKLIST_LIST_FETCH_SUCCESS:
      return {
        ...state,
        tasklistsById: action.payload.tasklistsById,
        isFetching: false
      };

    case constants.TASKLIST_SELECT:
      return {
        ...state,
        selectedId: action.payload.selectedId
      };

    default:
      return state;
  }
};

const getTaskLists = ({ tasklistsById }: types.TasklistListState) => {
  return Object.keys(tasklistsById).map((id: any) => tasklistsById[id]);
};

const getSelectedTaskList = ({ selectedId, tasklistsById }: types.TasklistListState) => {
  return tasklistsById[selectedId]
};

export { tasklistList, getTaskLists, getSelectedTaskList };
