import * as React from 'react';
import DashboardScreenContainer from '../DashboardScreen/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreenContainer from '../HomeScreen/HomeScreenContainer';
import UnknownErrorScreen from '../UnknownErrorScreen/UnknownErrorScreen';
import { connect } from 'react-redux';
import * as types from '../../types';
import * as userActions from '../../actions/userActions';
import { Splash } from '../Splash/Splash';
import Terms from '../Terms/Terms';
import Privacy from '../Privacy/Privacy';
import ScrollToTop from '../utils/ScrollToTop';

interface Props {
  user: types.UserState;
  verifyUser(): any;
}

interface State {
  hasError: boolean;
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    if (!this.props.user.initialized) {
      this.props.verifyUser();
    }
  }

  componentDidCatch(error: any, info: any) {
    // TODO: send error to bug track system.
    this.setState(() => ({ hasError: true }));
  }

  render() {
    if (this.state.hasError) {
      return <div>Sorry, Something went wrong.</div>;
    }

    if (!this.props.user.initialized) {
      return <Splash />;
    }

    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomeScreenContainer} />
            <Route exact path="/tasklists" component={DashboardScreenContainer} />
            <Route path="/tasklists/:tasklistId?" component={DashboardScreenContainer} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/unknown_error" component={UnknownErrorScreen} />
            <Route component={HomeScreenContainer} />
          </Switch>
          <MessageContainer />
        </ScrollToTop>
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
