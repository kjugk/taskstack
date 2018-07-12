import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectedTaskList } from '../../reducers/tasklistList';
import { getTasks } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { List } from '../../components/task/List';

interface TasksContainerProps {
  tasklist: types.TasklistState | undefined;
  tasks: types.TaskState[];
  fetchTasks(tasklistId: number): any;
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
    const { tasklist, tasks } = this.props;

    if (!tasklist) return null;

    return (
      <div>
        <List items={tasks} />
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  tasklist: getSelectedTaskList(state.tasklistList),
  tasks: getTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasks: (tasklistId: number) => dispatch(taskActions.fetchTasks(tasklistId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
