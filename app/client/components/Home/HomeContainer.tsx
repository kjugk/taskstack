import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Home } from './Home';

interface HomeProps {
  user: types.UserState;
}

class HomeContainer extends React.Component<HomeProps> {
  render() {
    if (this.props.user.signedIn) {
      return <Redirect to="/tasklists" />;
    }

    return <Home />;
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

export default connect(mapStateToProps)(HomeContainer);
