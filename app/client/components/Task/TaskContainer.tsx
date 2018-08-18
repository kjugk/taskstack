import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTask } from '../../reducers/tasks';
import { getTasklist } from '../../reducers/tasklists';
import * as taskActions from '../../actions/taskActions';
import { withRouter, Redirect } from 'react-router-dom';
import { Task } from './Task';
import key from 'keymaster';

interface TaskContainerProps {
  tasklist: types.TasklistState;
  task: types.TaskState | undefined;
  history: any;
  updateTask(id: number, params: any): any;
  destroyTask(id: number): any;
}

class TaskContainer extends React.Component<TaskContainerProps> {
  constructor(props: TaskContainerProps) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    key('esc', this.close);
    window.addEventListener('click', this.close);
  }

  componentWillUnmount() {
    key.unbind('esc');
    window.removeEventListener('click', this.close);
  }

  render() {
    const { task, tasklist, updateTask, destroyTask } = this.props;

    if (!task) return <Redirect to={`/tasklists/${tasklist.id}`} />;

    return <Task task={task} onUpdate={updateTask} onDestroy={destroyTask} onClose={this.close} />;
  }

  private close() {
    const { history, tasklist } = this.props;
    history.push(`/tasklists/${tasklist.id}`);
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklist: getTasklist(state, ownProps),
    task: getTask(state, ownProps),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      destroyTask: (id: number) => taskActions.destroyTask(id),
      updateTask: (id: number, params: any) => taskActions.updateTask(id, params)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskContainer)
);
