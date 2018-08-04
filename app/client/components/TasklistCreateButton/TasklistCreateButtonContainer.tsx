import * as React from 'react';
import { TasklistCreateButton } from './TasklistCreateButton';
import { withRouter } from 'react-router-dom';

interface TasklistCreateButtonContainerProps {
  history: any;
  match: any;
  location: any;
}

class TasklistCreateButtonContainer extends React.Component<TasklistCreateButtonContainerProps> {
  render() {
    return <TasklistCreateButton onClick={() => this.props.history.push('/tasklists/new')} />;
  }
}

export default withRouter(TasklistCreateButtonContainer);
