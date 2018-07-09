import { combineReducers } from 'redux';
import { tasklistList } from './tasklistList';
import { tasklistCreateForm } from './tasklist/createForm';
import { message } from './message';

const rootReducer = combineReducers({
  tasklistList,
  tasklistCreateForm,
  message
});

export default rootReducer;
