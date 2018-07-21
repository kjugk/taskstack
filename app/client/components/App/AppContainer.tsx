import * as React from 'react';
import DashboardContainer from '../Dashboard/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';

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
