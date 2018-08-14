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
import TasklistTitleContainer from '../TasklistTitle/TasklistTitleContainer';
import { Route, Switch } from 'react-router-dom';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import * as sidebarActions from '../../actions/sidebarActions';

const DashBoard = styled.div`
  height: 100%;
  display: flex;
  position: relative;
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

// TODO: Sidebar component に切り出そう
const MobileLeft = styled<{ open: boolean }, any>('div')`
  left: 0;
  top: 0;
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #eee;
  z-index: 3;
  transform: translateX(-100%);
  transition: transform 0.25s linear;
  ${(props) => props.open && 'transform: translate3D(0,0,0)'};
`;

const MobileOverlay = styled<{ open: boolean }, any>('div')`
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  z-index: 2;
  opacity: 0;
  width: 0;
  transition: opacity 0.2s ease;
  ${(props) => props.open && 'opacity: 1; width: 100%;'};
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

const Overlay: React.SFC = (props: any) => (
  <MobileOverlay open={props.open} onClick={props.onClick} />
);

interface DashboardProps {
  user: types.UserState;
  sidebar: types.SidebarState;
  dispatch: any;
}

class DashboardContainer extends React.Component<DashboardProps> {
  render() {
    const { user, sidebar } = this.props;

    if (!user.signedIn) {
      return <Redirect to="/" />;
    }

    return (
      <DashBoard>
        <Responsive as={Left} minWidth={768}>
          <InlineHeaderContainer />
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Responsive>

        <Responsive as={MobileLeft} maxWidth={767} open={sidebar.isOpen}>
          <InlineHeaderContainer />
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Responsive>
        <Responsive
          as={Overlay}
          maxWidth={767}
          open={sidebar.isOpen}
          onClick={() => this.props.dispatch(sidebarActions.close())}
        />

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

const mapStateToProps = (state: types.RootState) => ({
  user: state.user,
  sidebar: state.sidebar
});

export default connect(mapStateToProps)(DashboardContainer);
