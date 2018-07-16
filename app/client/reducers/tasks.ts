import * as constants from '../constants';
import * as types from '../types';
import { getSelectedTaskList } from '../reducers/tasklistList';

const initialState: types.TasksState = {
  isFetching: false,
  tasksById: {}
};

const tasks = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tasksById: action.payload.tasksById
      };

    case constants.TASK_CREATE_SUCCESS:
      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          ...action.payload.task
        }
      };

    case constants.TASK_UPDATE_SUCCESS:
      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          ...action.payload.task
        }
      };

    default:
      return state;
  }
};

// selector
// TODO: reselect を使う
const getActiveTasks = (state: types.RootState): types.TaskState[] => {
  const tasklist = getSelectedTaskList(state.tasklistList);
  const { tasksById } = state.tasks;

  if (tasklist === undefined) return [];

  console.log(tasksById);

  let res: types.TaskState[] = [];
  (tasklist.taskIds || []).forEach((id: any) => {
    if (!tasksById[id].completed) {
      res.push(tasksById[id]);
    }
  });

  return res;
};

const getCompletedTasks = (state: types.RootState): types.TaskState[] => {
  const tasklist = getSelectedTaskList(state.tasklistList);
  const { tasksById } = state.tasks;

  if (tasklist === undefined) return [];

  let res: types.TaskState[] = [];
  (tasklist.taskIds || []).forEach((id: any) => {
    if (tasksById[id].completed) {
      res.push(tasksById[id]);
    }
  });

  return res;
};

export { tasks, getActiveTasks, getCompletedTasks };
