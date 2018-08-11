import * as React from 'react';
import styled from 'styled-components';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import TasklistCreateButtonContainer from '../TasklistCreateButton/TasklistCreateButtonContainer';
import InlineHeaderContainer from '../InlineHeader/InlineHeaderContainer';
import { TasklistTitle } from '../TasklistTitle/TasklistTitle';
import { Route, Switch } from 'react-router-dom';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTasklist } from '../../reducers/tasklists';

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
  tasklist: types.TasklistState;
}

class DashboardContainer extends React.Component<DashboardProps> {
  render() {
    const { user, tasklist } = this.props;

    if (!user.signedIn) {
      return <Redirect to="/" />;
    }

    return (
      <DashBoard>
        <Left>
          <InlineHeaderContainer />
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Left>

        <Center>
          <TasklistTitle tasklist={tasklist} />
          <TaskCreateFormContainer />
          <TasksContainer />
        </Center>

        <Right>
          <Route path="/tasklists/:tasklistId/tasks/:taskId" component={TaskContainer} />
        </Right>

        <Switch>
          <Route exact path="/tasklists/new" component={TasklistCreateFormContainer} />
          <Route path="/tasklists/(.*)/with/new" component={TasklistCreateFormContainer} />
          <Route exact path="/tasklists/:tasklistId/edit" component={TasklistEditFormContainer} />
        </Switch>
      </DashBoard>
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => ({
  user: state.user,
  tasklist: getTasklist(state, ownProps)
});

export default connect(mapStateToProps)(DashboardContainer);
