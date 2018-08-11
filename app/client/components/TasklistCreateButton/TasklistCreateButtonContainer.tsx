import * as React from 'react';
import * as types from '../../types';
import { TasklistCreateButton } from './TasklistCreateButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasklist } from '../../reducers/tasklists';

interface TasklistCreateButtonContainerProps {
  tasklist: types.TasklistState;
  history: any;
  match: any;
  location: any;
}

class TasklistCreateButtonContainer extends React.Component<TasklistCreateButtonContainerProps> {
  constructor(props: TasklistCreateButtonContainerProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <TasklistCreateButton onClick={this.handleClick} />;
  }

  handleClick() {
    const { tasklist, history } = this.props;

    if (tasklist) {
      history.push(`/tasklists/${tasklist.id}/with/new`);
    } else {
      history.push('/tasklists/new');
    }
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => ({
  tasklist: getTasklist(state, ownProps)
});

export default withRouter(connect(mapStateToProps)(TasklistCreateButtonContainer));
