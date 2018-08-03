import { combineReducers } from 'redux';
import { tasklists } from './tasklists';
import { tasklistCreateForm } from './tasklist/createForm';
import { tasklistEditForm } from './tasklist/editForm';
import { tasks } from './tasks';
import { taskCreateForm } from './task/createForm';
import { message } from './message';

const rootReducer = combineReducers({
  tasklists,
  tasklistCreateForm,
  tasklistEditForm,
  tasks,
  taskCreateForm,
  message
});

export default rootReducer;
