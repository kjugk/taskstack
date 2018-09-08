import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import AppContainer from './components/App/AppContainer';
import './assets/my-semantic-theme/semantic.less';

interface Theme {
  main: string;
  white: string;
  black: string;
  grey: string;
  lightGrey: string;
  darkGrey: string;
  border: string;
}
const theme: Theme = {
  main: 'rgba(33, 133, 208, 1)',
  // main: '#1d127d',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(31, 31, 45, 1)',
  grey: 'rgba(241, 241, 242, 1)',
  lightGrey: 'rgb(251, 251, 251)',
  darkGrey: 'rgb(224, 225, 226)',
  border: 'rgba(221, 222, 223, 1)'
};

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
