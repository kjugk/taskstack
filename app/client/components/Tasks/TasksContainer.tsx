import * as React from 'react';
import * as types from '../../types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectingTasklist } from '../../reducers/tasklists';
import { getAllTasks } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { Tasks } from './Tasks';
import { CompletedTasks } from './CompletedTasks/CompletedTasks';
import { withRouter } from 'react-router-dom';

interface TasksContainerProps {
  tasksState: types.TasksState;
  tasklist: types.TasklistState | undefined;
  activeTasks: types.TaskState[];
  completedTasks: types.TaskState[];
  history: any;
  fetchTasks(tasklistId: number): any;
  updateTask(id: number, params: any): any;
  updateSort(tasklistId: number, taskIds: number[]): any;
}

class TasksContainer extends React.Component<TasksContainerProps> {
  componentDidMount() {
    const { tasklist, fetchTasks } = this.props;
    if (!tasklist) return;

    fetchTasks(tasklist.id);
  }

  componentDidUpdate() {
    const { tasklist, tasksState, fetchTasks } = this.props;
    if (!tasklist) {
      return;
    }

    if (!tasklist.taskLoaded && !tasksState.isFetching) {
      fetchTasks(tasklist.id);
    }
  }

  render() {
    const { tasksState, tasklist, activeTasks, completedTasks, updateTask } = this.props;
    if (!tasklist) return null;

    if (tasksState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <div style={{ flex: 1 }} onClick={() => this.props.history.push(`/tasklists/${tasklist.id}`)}>
        <Tasks
          tasklist={tasklist}
          items={activeTasks}
          onCheckChange={updateTask}
          onItemClick={this.handleTaskSelect.bind(this)}
          onSort={(tasklistId: number, taskIds: number[]) => {
            this.props.updateSort(tasklistId, taskIds.concat(completedTasks.map((t) => t.id)));
          }}
        />

        <CompletedTasks
          items={completedTasks}
          onCheckChange={updateTask}
          onItemClick={this.handleTaskSelect.bind(this)}
        />
      </div>
    );
  }

  private handleTaskSelect(id: number) {
    const { history, tasklist } = this.props;
    if (!tasklist) return;
    history.push(`/tasklists/${tasklist.id}/tasks/${id}`);
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);
  const tasklist = getSelectingTasklist(tasklistId)(state);
  const activeTasks = getAllTasks(tasklist)(state).filter((t) => !t.completed);
  const completedTasks = getAllTasks(tasklist)(state).filter((t) => t.completed);

  return {
    tasksState: state.tasks,
    tasklist,
    activeTasks,
    completedTasks
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasks: (tasklistId: number) => dispatch(taskActions.fetchTasks(tasklistId)),
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params)),
  updateSort: (tasklistId: number, taskIds: number[]) =>
    dispatch(taskActions.updateSort(tasklistId, taskIds))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasksContainer)
);
