import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';
import { Loader } from 'semantic-ui-react';
import { Tasklists } from './Tasklists';
import * as tasklistActions from '../../actions/tasklistActions';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
  position: relative;
`;

interface TasklistsContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  tasklists: types.TasklistState[];
  match: any;
  history: any;
  fetchTasklists(): any;
  editTasklist(tasklist: any): any;
}

class TasklistsContainer extends React.Component<TasklistsContainerProps> {
  componentDidMount() {
    const { isInitialized, fetchTasklists } = this.props;

    if (!isInitialized) {
      fetchTasklists();
    }
  }

  render() {
    const { tasklists, editTasklist, isFetching, match } = this.props;
    const selectingId = parseInt(match.params.tasklistId, 10);

    if (isFetching) {
      return (
        <Container>
          <Loader active>Loading</Loader>
        </Container>
      );
    }

    // Dashboard に移譲する?
    if (match.path === '/' && tasklists.length > 0) {
      return <Redirect to={`/tasklists/${tasklists[0].id}`} />;
    }

    return (
      <Container>
        <Tasklists
          selectingId={selectingId}
          onItemClick={(id: number) => this.props.history.push(`/tasklists/${id}`)}
          onEditButtonClick={editTasklist}
          items={tasklists}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const { isFetching, isInitialized } = state.tasklists;

  return {
    isFetching,
    isInitialized,
    tasklists: getTasklists(state),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTasklists: () => dispatch(tasklistActions.fetchTasklists()),
  editTasklist: (tasklist: any) => dispatch(tasklistActions.editTasklist(tasklist))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistsContainer)
);
