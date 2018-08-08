import * as React from 'react';
import DashboardContainer from '../Dashboard/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../Home/Home';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tasklists" component={DashboardContainer} />
            <Route path="/tasklists/:tasklistId" component={DashboardContainer} />
          </Switch>
          <MessageContainer />
        </>
      </Router>
    );
  }
}

export { AppContainer };
