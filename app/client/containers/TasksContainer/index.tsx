import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectedTasklist } from '../../reducers/tasklistList';
import { getActiveTasks, getCompletedTasks } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { List } from '../../components/TaskList/TaskList';

interface TasksContainerProps {
  tasklist: types.TasklistState | undefined;
  tasks: types.TaskState[];
  completedTasks: types.TaskState[];
  fetchTasks(tasklistId: number): any;
  updateTask(id: number, params: any): any;
  selectTask(id: number): any;
}

class TasksContainer extends React.Component<TasksContainerProps> {
  componentDidUpdate(prevProps: TasksContainerProps) {
    const prevTasklist = prevProps.tasklist;
    const { tasklist, fetchTasks } = this.props;

    if (!tasklist) return;

    if (!prevTasklist && tasklist) {
      fetchTasks(tasklist.id);
      return;
    }

    if (prevTasklist && prevTasklist.id !== tasklist.id) {
      fetchTasks(tasklist.id);
      return;
    }
  }

  render() {
    const { tasklist, tasks, completedTasks, updateTask, selectTask} = this.props;
    if (!tasklist) return null;

    return (
      <>
        <List items={tasks} onCheckChange={updateTask} onItemClick={selectTask} />

        {completedTasks.length >= 1 && (
          <div>
            <span>{completedTasks.length} 件の完了済みタスク</span>
            <List items={completedTasks} onCheckChange={updateTask} onItemClick={selectTask} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  tasklist: getSelectedTasklist(state),
  tasks: getActiveTasks(state),
  completedTasks: getCompletedTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasks: (tasklistId: number) => dispatch(taskActions.fetchTasks(tasklistId)),
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params)),
  selectTask: (id: number) => dispatch(taskActions.selectTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
