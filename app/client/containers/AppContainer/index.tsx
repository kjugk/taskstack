import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../store/configureStore';
import { DashboardContainer } from '../DashboardContainer';

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <DashboardContainer />;
      </Provider>
    );
  }
}

export { AppContainer };
