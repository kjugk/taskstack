import * as React from 'react';
import * as types from '../../types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectedTasklist } from '../../reducers/tasklistList';
import { getActiveTasks, getCompletedTasks } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { Tasks } from './Tasks';
import { CompletedTasks } from './CompletedTasks/CompletedTasks';

interface TasksContainerProps {
  tasksState: types.TasksState;
  tasklist: types.TasklistState | undefined;
  tasks: types.TaskState[];
  completedTasks: types.TaskState[];
  fetchTasks(tasklistId: number): any;
  updateTask(id: number, params: any): any;
  selectTask(id: number): any;
  updateSort(tasklistId: number, taskIds: number[]): any;
}

class TasksContainer extends React.Component<TasksContainerProps> {
  componentDidUpdate(prevProps: TasksContainerProps) {
    const prevTasklist = prevProps.tasklist;
    const { tasklist, fetchTasks } = this.props;

    if (!tasklist) return;

    if (!prevTasklist && tasklist && !tasklist.taskLoaded) {
      fetchTasks(tasklist.id);
      return;
    }

    if (prevTasklist && prevTasklist.id !== tasklist.id && !tasklist.taskLoaded) {
      fetchTasks(tasklist.id);
      return;
    }
  }

  render() {
    const { tasksState, tasklist, tasks, completedTasks, updateTask, selectTask } = this.props;
    if (!tasklist) return null;

    if (tasksState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <div style={{ flex: 1 }} onClick={() => selectTask(-1)}>
        <Tasks
          tasklist={tasklist}
          items={tasks}
          onCheckChange={updateTask}
          onItemClick={selectTask}
          onSort={(tasklistId: number, taskIds: number[]) => {
            this.props.updateSort(tasklistId, taskIds.concat(completedTasks.map((t) => t.id)));
          }}
        />

        <CompletedTasks
          items={completedTasks}
          onCheckChange={updateTask}
          onItemClick={selectTask}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  tasksState: state.tasks,
  tasklist: getSelectedTasklist(state),
  tasks: getActiveTasks(state),
  completedTasks: getCompletedTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasks: (tasklistId: number) => dispatch(taskActions.fetchTasks(tasklistId)),
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params)),
  selectTask: (id: number) => dispatch(taskActions.selectTask(id)),
  updateSort: (tasklistId: number, taskIds: number[]) =>
    dispatch(taskActions.updateSort(tasklistId, taskIds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
