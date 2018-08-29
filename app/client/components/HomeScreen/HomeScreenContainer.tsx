import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';

interface HomeProps {
  user: types.UserState;
}

class HomeScreenContainer extends React.Component<HomeProps> {
  render() {
    if (this.props.user.signedIn) {
      return <Redirect to="/tasklists" />;
    }

    return <HomeScreen />;
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

export default connect(mapStateToProps)(HomeScreenContainer);
