import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';

import { getTaskLists } from '../../reducers/tasklistList';

interface TasklistListContainerProps {
  tasklists: types.TasklistState[];
}

class TasklistListContainer extends React.Component<TasklistListContainerProps> {
  render() {
    return (
      <div>
        {this.props.tasklists.map((tasklist) => {
          {
            tasklist.title;
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  return {
    tasklists: getTaskLists(state.tasklistList)
  }
};

export default connect(mapStateToProps)(TasklistListContainer);
