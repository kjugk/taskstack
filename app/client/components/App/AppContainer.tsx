import * as React from 'react';
import DashboardContainer from '../Dashboard/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Route exact path="/" component={DashboardContainer} />
          <Route path="/tasklists/:tasklistId" component={DashboardContainer} />
          <MessageContainer />
        </>
      </Router>
    );
  }
}

export { AppContainer };
