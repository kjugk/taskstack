import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { AppContainer } from './containers/AppContainer';

import "./css/index.scss"

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
