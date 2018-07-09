import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTaskLists } from '../../reducers/tasklistList';
import { Loader } from 'semantic-ui-react';
import { List } from '../../components/tasklist/List';
import * as tasklistActions from '../../actions/tasklistActions';
import styled from 'styled-components';

interface TasklistListContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  tasklists: types.TasklistState[];
  fetchTasklists: () => any;
}

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

class TasklistListContainer extends React.Component<TasklistListContainerProps> {
  componentDidMount() {
    const { isInitialized, fetchTasklists } = this.props;

    if (isInitialized) {
      return;
    }

    fetchTasklists();
  }

  render() {
    const { tasklists, isFetching } = this.props;

    if (isFetching) {
      return (
        <Container>
          <Loader active>Loading</Loader>
        </Container>
      );
    }

    return (
      <Container>
        <List items={tasklists} />
      </Container>
    );
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

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasklists: () => dispatch(tasklistActions.fetchTasklists())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasklistListContainer);
