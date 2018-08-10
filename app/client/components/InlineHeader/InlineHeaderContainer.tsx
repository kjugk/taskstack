import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../../types';
import { InlineHeader } from './InlineHeader';
import * as userActions from '../../actions/userActions';

interface InlineHeaderContainerProps {
  user: types.UserState;
  signOut(): any;
}

class InlineHeaderContainer extends React.Component<InlineHeaderContainerProps> {
  render() {
    return <InlineHeader user={this.props.user} onSignOutClick={this.props.signOut} />;
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(userActions.signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineHeaderContainer);
