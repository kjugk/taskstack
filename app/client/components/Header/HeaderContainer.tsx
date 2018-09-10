import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sidebarActions from '../../actions/sidebarActions';
import { getTasklist } from '../../reducers/tasklists';
import { Header } from './Header';
import { withRouter } from 'react-router-dom';

interface Props {
  tasklist: types.TasklistState;
  openSidebar(): any;
}

class HeaderContainer extends React.Component<Props> {
  render() {
    const { tasklist, openSidebar } = this.props;
    return <Header tasklist={tasklist} onClickBars={openSidebar} />;
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklist: getTasklist(state, ownProps)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      openSidebar: () => sidebarActions.open()
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
