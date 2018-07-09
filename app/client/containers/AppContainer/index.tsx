import * as React from 'react';
import DashboardContainer from '../DashboardContainer';
import MessageContainer from '../MessageContainer';

class AppContainer extends React.Component {
  render() {
    return (
      <>
        <DashboardContainer />
        <MessageContainer />
      </>
    );
  }
}

export { AppContainer };
