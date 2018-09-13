import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import AppContainer from './components/App/AppContainer';
import './assets/my-semantic-theme/semantic.less';
import { theme } from './theme';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
