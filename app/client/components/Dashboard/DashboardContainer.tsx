import * as React from 'react';
import styled from 'styled-components';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import TasklistCreateButtonContainer from '../TasklistCreateButton/TasklistCreateButtonContainer';
import { InlineHeader } from '../Header/InlineHeader/InlineHeader';
import { Route } from 'react-router-dom';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const DashBoard = styled.div`
  height: 100%;
  display: flex;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  flex-basis: 260px;
  background: #eee;
  max-width: 260px;
`;

const Center = styled.div`
  height: 100%;
  padding: 1rem;
  flex: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Right = styled.div`
  height: 100%;
`;

interface DashboardProps {
  user: types.UserState;
}

class DashboardContainer extends React.Component<DashboardProps> {
  render() {
    const { user } = this.props;

    if (!user.signedIn) {
      return <Redirect to="/tasklists" />;
    }

    return (
      <DashBoard>
        <Left>
          <InlineHeader user={user} />
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Left>

        <Center>
          <TaskCreateFormContainer />
          <TasksContainer />
        </Center>

        <Right>
          <Route path="/tasklists/:tasklistId/tasks/:taskId" component={TaskContainer} />
        </Right>

        <Route exact path="/tasklists/new" component={TasklistCreateFormContainer} />
        <Route exact path="/tasklists/:tasklistId/edit" component={TasklistEditFormContainer} />
      </DashBoard>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

export default connect(mapStateToProps)(DashboardContainer);
