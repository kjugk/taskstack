import { combineReducers } from 'redux';
import { tasklistList } from './tasklistList';
import { tasklistCreateForm } from './tasklist/createForm';
import { tasklistEditForm } from './tasklist/editForm';
import { tasks } from './tasks';
import { taskCreateForm } from './taskCreateForm';
import { message } from './message';

const rootReducer = combineReducers({
  tasklistList,
  tasklistCreateForm,
  tasklistEditForm,
  tasks,
  taskCreateForm,
  message
});

export default rootReducer;
