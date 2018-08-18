import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getTasklist } from '../../reducers/tasklists';
import * as sidebarAction from '../../actions/sidebarActions';
import { TasklistTitle } from './TasklistTitle';

const mapStateToProps = (state: types.RootState, ownProps: any) => ({
  tasklist: getTasklist(state, ownProps)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onHambergerClick: () => sidebarAction.open()
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistTitle)
);
