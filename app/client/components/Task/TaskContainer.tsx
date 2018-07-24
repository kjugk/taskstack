import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectingTask } from '../../reducers/tasks';
import * as taskActions from '../../actions/taskActions';
import { Task } from './Task'

interface TaskContainerProps {
  task: types.TaskState | undefined;
  selectTask(id: number): any;
  updateTask(id: number, params: any): any;
}

class TaskContainer extends React.Component<TaskContainerProps> {
  render() {
    const { task, selectTask, updateTask } = this.props;

    if (!task) return null;

    return (
      <Task task={task}
        onCloseClick={() => selectTask(-1)}
        onUpdate={updateTask}
      />
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  task: getSelectingTask(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  selectTask: (id: number) => dispatch(taskActions.selectTask(id)),
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
