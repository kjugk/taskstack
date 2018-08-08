import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';
import { Loader } from 'semantic-ui-react';
import { Tasklists } from './Tasklists';
import * as tasklistActions from '../../actions/tasklistActions';
import { withRouter, Redirect } from 'react-router-dom';

interface TasklistsContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  tasklists: types.TasklistState[];
  match: any;
  history: any;
  fetchTasklists(): any;
  editTasklist(tasklist: any): any;
}

class TasklistsContainer extends React.Component<TasklistsContainerProps> {
  componentDidMount() {
    const { isInitialized, fetchTasklists } = this.props;

    if (!isInitialized) {
      fetchTasklists();
    }
  }

  render() {
    const { tasklists, isFetching, match } = this.props;
    const selectingId = parseInt(match.params.tasklistId, 10);

    if (isFetching) {
      return <Loader active>Loading</Loader>;
    }

    // Dashboard に移譲する?
    if (match.path === '/' && tasklists.length > 0) {
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
  const { isFetching, isInitialized } = state.tasklists;

  return {
    isFetching,
    isInitialized,
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