import * as React from 'react';
import * as types from '../../types';
import { Loader, Dimmer } from 'semantic-ui-react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTasklist } from '../../reducers/tasklists';
import { getActiveTasks, getCompletedTasks } from '../../reducers/tasks';
import * as tasklistActions from '../../actions/tasklistActions';
import * as taskActions from '../../actions/taskActions';
import { ActiveTasks } from './ActiveTasks/ActiveTasks';
import { CompletedTasks } from './CompletedTasks/CompletedTasks';
import { withRouter } from 'react-router-dom';
import { TasksFallbackContent } from './TasksFallbackContent/TasksFallbackContent';

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
  constructor(props: TasksContainerProps) {
    super(props);
    this.handleOnItemClick = this.handleOnItemClick.bind(this);
  }

  componentDidMount() {
    const { tasklist, fetchTasks } = this.props;
    if (!tasklist) return;

    fetchTasks(tasklist.id);
  }

  componentDidUpdate() {
    const { tasklist, tasksState, fetchTasks } = this.props;
    if (!tasklist) return;

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

    if (!tasklist) return <TasksFallbackContent />;

    if (tasksState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <div>
        <Dimmer page active={tasksState.isUpdating}>
          <Loader>Loading</Loader>
        </Dimmer>

        <ActiveTasks
          tasklist={tasklist}
          items={activeTasks}
          onCheckChange={updateTask}
          onItemClick={this.handleOnItemClick}
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
          onItemClick={this.handleOnItemClick}
        />
      </div>
    );
  }

  private handleOnItemClick(id: number) {
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTasks: (tasklistId: number) => taskActions.fetchTasks(tasklistId),
      updateTask: (id: number, params: any) => taskActions.updateTask(id, params),
      updateSort: (tasklistId: number, taskIds: number[]) =>
        taskActions.updateTaskSort(tasklistId, taskIds),
      destroyCompletedTasks: (tasklistId: number, taskIds: number[]) =>
        tasklistActions.removeCompletedTaskIds(tasklistId, taskIds)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasksContainer)
);
