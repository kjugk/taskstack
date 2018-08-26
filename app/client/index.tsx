import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import AppContainer from './components/App/AppContainer';
import './my-semantic-theme/semantic.less';

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
