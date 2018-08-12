import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getTasklist } from '../../reducers/tasklists';
import * as sidebarAction from '../../actions/sidebarActions';
import { TasklistTitle } from './TasklistTitle';

interface TasklistTitleContainerProps {
  tasklist: types.TasklistState;
  openSidebar(): any;
}

class TasklistTitleContainer extends React.Component<TasklistTitleContainerProps> {
  render() {
    const { tasklist, openSidebar } = this.props;
    return (
      <TasklistTitle
        tasklist={tasklist}
        onHambergerClick={() => {
          openSidebar();
        }}
      />
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => ({
  tasklist: getTasklist(state, ownProps)
});

const mapDispatchToProps = (dispatch: any) => ({
  openSidebar: () => dispatch(sidebarAction.open())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistTitleContainer)
);
