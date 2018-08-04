import * as React from 'react';
import { connect } from 'react-redux';
import * as tasklistActions from '../../actions/tasklistActions';
import { TasklistCreateButton } from './TasklistCreateButton';

interface TasklistCreateButtonContainerProps {
  createTasklist: () => any;
}

class TasklistCreateButtonContainer extends React.Component<TasklistCreateButtonContainerProps> {
  render() {
    return <TasklistCreateButton onClick={this.props.createTasklist} />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  createTasklist: () => dispatch(tasklistActions.createTasklist())
});

export default connect(
  undefined,
  mapDispatchToProps
)(TasklistCreateButtonContainer);
