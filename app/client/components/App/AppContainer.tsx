import * as React from 'react';
import DashboardContainer from '../Dashboard/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from '../Home/HomeContainer';
import { connect } from 'react-redux';
import * as types from '../../types';
import * as userActions from '../../actions/userActions';
import { Loader } from 'semantic-ui-react';

interface AppContainerProps {
  user: types.UserState;
  verifyUser(): any;
}

class AppContainer extends React.Component<AppContainerProps> {
  componentDidMount() {
    this.props.verifyUser();
  }

  render() {
    if (!this.props.user.initialized) {
      return <Loader />;
    }

    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/tasklists" component={DashboardContainer} />
            <Route path="/tasklists/:tasklistId" component={DashboardContainer} />
            <Route component={HomeContainer} />
          </Switch>
          <MessageContainer />
        </>
      </Router>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  verifyUser: () => dispatch(userActions.verify())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
