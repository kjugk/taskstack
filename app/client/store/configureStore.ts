import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

export { configureStore };
