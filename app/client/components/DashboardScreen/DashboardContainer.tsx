import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import SidebarContainer from '../Sidebar/SidebarContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../Tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';
import HeaderContainer from '../AppHeader/HeaderContainer';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateButtonContainer from '../TasklistCreateButton/TasklistCreateButtonContainer';

const DashBoard = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1rem 2rem;
  position: relative;
  ${(props) => `background: ${props.theme.lightGrey}`};

  @media (max-width: 786px) {
    padding: 1rem;
  }
`;

interface Props {
  app: types.AppState;
  user: types.UserState;
  tasklists: types.TasklistState[];
  match: any;
}

class DashboardScreenContainer extends React.Component<Props> {
  render() {
    const { app, user, match, tasklists } = this.props;

    if (app.hasUnkownError) {
      return <Redirect to="/unknown_error" />;
    }

    if (!user.signedIn) {
      return <Redirect to="/" />;
    }

    if (match.path === '/tasklists' && tasklists.length > 0) {
      return <Redirect to={`/tasklists/${tasklists[0].id}`} />;
    }

    return (
      <DashBoard>
        <HeaderContainer />

        <div style={{ display: 'flex', flex: 1 }}>
          <SidebarContainer>
            <TasklistsContainer />
            <TasklistCreateButtonContainer />
          </SidebarContainer>

          <Center>
            <TaskCreateFormContainer />
            <Switch>
              <Route exact path="/tasklists/:tasklistId/tasks/:taskId" component={TasksContainer} />
              <Route component={TasksContainer} />
            </Switch>
          </Center>

          <Route path="/tasklists/:tasklistId/tasks/:taskId" component={TaskContainer} />
        </div>

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
  app: state.app,
  user: state.user,
  tasklists: getTasklists(state)
});

export default withRouter(connect(mapStateToProps)(DashboardScreenContainer));
