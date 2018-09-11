import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sidebarActions from '../../actions/sidebarActions';
import * as userActions from '../../actions/userActions';
import { getTasklist } from '../../reducers/tasklists';
import { Header } from './Header';
import { withRouter } from 'react-router-dom';

interface Props {
  tasklist: types.TasklistState;
  user: types.UserState;
  openSidebar(): any;
  signOut(): any;
}

class HeaderContainer extends React.Component<Props> {
  render() {
    const { tasklist, user, openSidebar, signOut } = this.props;
    return (
      <Header tasklist={tasklist} user={user} onClickSignOut={signOut} onClickBars={openSidebar} />
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklist: getTasklist(state, ownProps),
    user: state.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      openSidebar: () => sidebarActions.open(),
      signOut: () => userActions.signOut()
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderContainer)
);
