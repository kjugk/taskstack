import { combineReducers } from 'redux';
import { tasklistList } from './tasklistList';
import { tasklistCreateForm } from './tasklist/createForm';
import { tasklistEditForm } from './tasklist/editForm';
import { message } from './message';

const rootReducer = combineReducers({
  tasklistList,
  tasklistCreateForm,
  tasklistEditForm,
  message
});

export default rootReducer;
