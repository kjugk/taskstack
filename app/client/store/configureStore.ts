import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  const store = setupStore();
  sagaMiddleware.run(sagas);

  return store;
};

function setupStore() {
  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, applyMiddleware(sagaMiddleware));
  } else {
    return createStore(
      rootReducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(sagaMiddleware)
    );
  }
}

export { configureStore };
