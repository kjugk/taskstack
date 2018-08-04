import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectingTask } from '../../reducers/tasks';
import { getSelectingTasklist } from '../../reducers/tasklists';
import * as taskActions from '../../actions/taskActions';
import { Task } from './Task';
import { withRouter } from 'react-router-dom';

interface TaskContainerProps {
  task: types.TaskState | undefined;
  tasklist: types.TasklistState;
  history: any;
  updateTask(id: number, params: any): any;
  destroyTask(id: number): any;
}

class TaskContainer extends React.Component<TaskContainerProps> {
  componentDidUpdate() {
    const { task, tasklist, history } = this.props;

    if (!task) {
      history.replace(`/tasklists/${tasklist.id}`);
    }
  }

  render() {
    const { task, updateTask, destroyTask } = this.props;
    return <Task task={task} onUpdate={updateTask} onDestroy={destroyTask} />;
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const selectingId = parseInt(ownProps.match.params.taskId, 10);
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);

  return {
    task: getSelectingTask(selectingId)(state),
    tasklist: getSelectingTasklist(tasklistId)(state),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  destroyTask: (id: number) => dispatch(taskActions.destroyTask(id)),
  updateTask: (id: number, params: any) => dispatch(taskActions.updateTask(id, params))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskContainer)
);
