import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTaskLists } from '../../reducers/tasklistList';
import { Loader } from 'semantic-ui-react';
import { List } from '../../components/tasklist/List';

interface TasklistListContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  tasklists: types.TasklistState[];
}

class TasklistListContainer extends React.Component<TasklistListContainerProps> {
  componentDidMount() {
    const { isInitialized } = this.props;

    if (isInitialized) {
      return;
    }
  }

  render() {
    const { tasklists, isFetching } = this.props;

    if (isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return <List items={tasklists} />;
  }
}

const mapStateToProps = (state: types.RootState) => {
  const { isFetching, isInitialized } = state.tasklistList;

  return {
    isFetching,
    isInitialized,
    tasklists: getTaskLists(state.tasklistList)
  };
};

export default connect(mapStateToProps)(TasklistListContainer);
