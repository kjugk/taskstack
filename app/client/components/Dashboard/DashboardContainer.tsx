import * as React from 'react';
import styled from 'styled-components';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import TasklistCreateButtonContainer from '../TasklistCreateButton/TasklistCreateButtonContainer';

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

class DashboardContainer extends React.Component {
  render() {
    return (
      <DashBoard>
        <Left>
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Left>

        <Center>
          <TaskCreateFormContainer />
          <TasksContainer />
        </Center>

        <Right>
          <TaskContainer />
        </Right>

        <TasklistCreateFormContainer />
        <TasklistEditFormContainer />
      </DashBoard>
    );
  }
}

export default DashboardContainer;
