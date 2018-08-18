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

interface Props {
  tasklist: types.TasklistState;
  task: types.TaskState | undefined;
  history: any;
  updateTask(id: number, params: any): any;
  destroyTask(id: number): any;
}

interface State {
  open: boolean;
}

class TaskContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    key('esc', this.close);
    window.addEventListener('click', this.close);
    setTimeout(() => {
      this.setState(() => ({ open: true }));
    }, 0);
  }

  componentWillUnmount() {
    key.unbind('esc');
    window.removeEventListener('click', this.close);
  }

  render() {
    const { task, tasklist, updateTask, destroyTask, history } = this.props;

    if (!task) return <Redirect to={`/tasklists/${tasklist.id}`} />;

    return (
      <Task
        open={this.state.open}
        task={task}
        onUpdate={updateTask}
        onDestroy={destroyTask}
        onClose={this.close}
        onHide={() => {
          history.push(`/tasklists/${tasklist.id}`);
        }}
      />
    );
  }

  private close() {
    this.setState(() => ({ open: false }));
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
