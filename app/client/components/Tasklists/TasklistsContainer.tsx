import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';
import { Loader } from 'semantic-ui-react';
import { Tasklists } from './Tasklists';
import * as tasklistActions from '../../actions/tasklistActions';
import { withRouter, Redirect } from 'react-router-dom';

interface TasklistsContainerProps {
  tasklistsState: types.TasklistsState;
  tasklists: types.TasklistState[];
  match: any;
  history: any;
  fetchTasklists(): any;
  editTasklist(tasklist: any): any;
}

/**
 * タスクリスト一覧
 */
class TasklistsContainer extends React.Component<TasklistsContainerProps> {
  componentDidMount() {
    const { tasklistsState, fetchTasklists } = this.props;

    if (!tasklistsState.isInitialized) {
      fetchTasklists();
    }
  }

  render() {
    const { tasklistsState, tasklists, match } = this.props;
    const selectingId = parseInt(match.params.tasklistId, 10);

    if (tasklistsState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    // Dashboard に移譲する?
    if (match.path === '/tasklists' && tasklists.length > 0) {
      return <Redirect to={`/tasklists/${tasklists[0].id}`} />;
    }

    return (
      <Tasklists
        selectingId={selectingId}
        onItemClick={(id: number) => this.props.history.push(`/tasklists/${id}`)}
        onEditButtonClick={(id: number) => this.props.history.push(`/tasklists/${id}/edit`)}
        items={tasklists}
      />
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklistsState: state.tasklists,
    tasklists: getTasklists(state),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasklists: () => dispatch(tasklistActions.fetchTasklists()),
  editTasklist: (tasklist: any) => dispatch(tasklistActions.editTasklist(tasklist))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistsContainer)
);
