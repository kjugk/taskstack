import * as React from 'react';
import * as types from '../../types';
import { Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTasklist } from '../../reducers/tasklists';
import { getActiveTasks, getCompletedTasks, tasks } from '../../reducers/tasks';
import * as tasklistActions from '../../actions/tasklistActions';
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
  destroyCompletedTasks(tasklistId: number, taskIds: number[]): any;
  fetchTasks(tasklistId: number): any;
  updateTask(id: number, params: any): any;
  updateSort(tasklistId: number, taskIds: number[]): any;
}

/**
 * タスク一覧
 */
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
    const {
      tasksState,
      tasklist,
      activeTasks,
      completedTasks,
      updateTask,
      updateSort,
      destroyCompletedTasks
    } = this.props;
    // TODO fall back content を出す
    if (!tasklist) return null;

    if (tasksState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <div style={{ flex: 1 }} onClick={() => this.props.history.push(`/tasklists/${tasklist.id}`)}>
        <Dimmer page active={tasksState.isUpdating}>
          <Loader>Loading</Loader>
        </Dimmer>

        <Tasks
          tasklist={tasklist}
          items={activeTasks}
          onCheckChange={updateTask}
          onItemClick={this.handleTaskSelect.bind(this)}
          onSort={(tasklistId: number, taskIds: number[]) => {
            updateSort(tasklistId, taskIds.concat(completedTasks.map((t) => t.id)));
          }}
        />

        <CompletedTasks
          items={completedTasks}
          onCheckChange={updateTask}
          onDeleteButtonClick={() =>
            destroyCompletedTasks(tasklist.id, completedTasks.map((t) => t.id))
          }
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
  return {
    tasksState: state.tasks,
    tasklist: getTasklist(state, ownProps),
    activeTasks: getActiveTasks(state, ownProps),
    completedTasks: getCompletedTasks(state, ownProps),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  destroyCompletedTasks: (tasklistId: number, taskIds: number[]) =>
    dispatch(tasklistActions.destroyCompletedTasks(tasklistId, taskIds)),
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
