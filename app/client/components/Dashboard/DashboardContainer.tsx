import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import SidebarContainer from '../Sidebar/SidebarContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../Tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import TasklistTitleContainer from '../TasklistTitle/TasklistTitleContainer';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';

const DashBoard = styled.div`
  height: 100%;
  display: flex;
  position: relative;
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

interface Props {
  app: types.AppState;
  user: types.UserState;
  tasklists: types.TasklistState[];
  match: any;
}

class DashboardContainer extends React.Component<Props> {
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
        <SidebarContainer />

        <Center>
          <TasklistTitleContainer />
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
  app: state.app,
  user: state.user,
  tasklists: getTasklists(state)
});

export default withRouter(connect(mapStateToProps)(DashboardContainer));
