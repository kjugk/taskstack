import { combineReducers } from 'redux';
import { tasklistList } from './tasklistList';
import { tasklistCreateForm } from './tasklist/createForm';

const rootReducer = combineReducers({
  tasklistList,
  tasklistCreateForm
});

export default rootReducer;
