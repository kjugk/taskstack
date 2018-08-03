import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklistList';
import { Loader } from 'semantic-ui-react';
import { Tasklists } from './Tasklists';
import * as tasklistActions from '../../actions/tasklistActions';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
  position: relative;
`;

interface TasklistsContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  selectingId: number;
  tasklists: types.TasklistState[];
  fetchTasklists(): any;
  editTasklist(tasklist: any): any;
  selectTasklist(id: number): any;
}

class TasklistsContainer extends React.Component<TasklistsContainerProps> {
  componentDidMount() {
    const { isInitialized, fetchTasklists } = this.props;

    if (!isInitialized) {
      fetchTasklists();
    }
  }

  render() {
    const { tasklists, selectTasklist, editTasklist, isFetching, selectingId } = this.props;

    if (isFetching) {
      return (
        <Container>
          <Loader active>Loading</Loader>
        </Container>
      );
    }

    return (
      <Container>
        <Tasklists
          selectingId={selectingId}
          onItemClick={selectTasklist}
          onEditButtonClick={editTasklist}
          items={tasklists}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  const { isFetching, isInitialized, selectingId } = state.tasklistList;

  return {
    isFetching,
    isInitialized,
    selectingId,
    tasklists: getTasklists(state)
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasklists: () => dispatch(tasklistActions.fetchTasklists()),
  editTasklist: (tasklist: any) => dispatch(tasklistActions.editTasklist(tasklist)),
  selectTasklist: (id: number) => dispatch(tasklistActions.selectTasklist(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasklistsContainer);
