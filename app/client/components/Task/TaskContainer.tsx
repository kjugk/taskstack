import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectingTask } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { Task } from './Task';

interface TaskContainerProps {
  task: types.TaskState | undefined;
  updateTask(id: number, params: any): any;
  destroyTask(id: number): any;
}

class TaskContainer extends React.Component<TaskContainerProps> {
  render() {
    const { task, updateTask, destroyTask } = this.props;

    if (!task) return null;

    return <Task task={task} onUpdate={updateTask} onDestroy={destroyTask} />;
  }
}

const mapStateToProps = (state: types.RootState) => ({
  task: getSelectingTask(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params)),
  destroyTask: (id: number) => dispatch(taskActions.destroyTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
