import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getSelectingTask } from '../../reducers/tasks';
import { getSelectingTasklist } from '../../reducers/tasklists';
import * as taskActions from '../../actions/taskActions';
import { Task } from './Task';
import { withRouter, Redirect } from 'react-router-dom';

interface TaskContainerProps {
  task: types.TaskState | undefined;
  tasklist: types.TasklistState;
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
  const taskId = parseInt(ownProps.match.params.taskId, 10);
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);

  return {
    task: getSelectingTask(taskId)(state),
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
