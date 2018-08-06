import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTask } from '../../reducers/tasks';
import { getTasklist } from '../../reducers/tasklists';
import * as taskActions from '../../actions/taskActions';
import { Task } from './Task';
import { withRouter, Redirect } from 'react-router-dom';

interface TaskContainerProps {
  tasklist: types.TasklistState;
  task: types.TaskState | undefined;
  updateTask(id: number, params: any): any;
  destroyTask(id: number): any;
}

class TaskContainer extends React.Component<TaskContainerProps> {
  render() {
    const { task, tasklist, updateTask, destroyTask } = this.props;

    if (!task) {
      return <Redirect to={`/tasklists/${tasklist.id}`} />;
    }

    return <Task task={task} onUpdate={updateTask} onDestroy={destroyTask} />;
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);
  const taskId = parseInt(ownProps.match.params.taskId, 10);

  return {
    tasklist: getTasklist(tasklistId)(state),
    task: getTask(taskId)(state),
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
