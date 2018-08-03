import * as React from 'react';
import styled from 'styled-components';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TasksContainer from '../tasks/TasksContainer';
import TaskContainer from '../Task/TaskContainer';
import { TasklistCreateButton } from '../TasklistCreateButton/TasklistCreateButton';
import { connect } from 'react-redux';
import * as tasklistActions from '../../actions/tasklistActions';

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

interface DashboardContainerProps {
  createTasklist: () => any;
}

class DashboardContainer extends React.Component<DashboardContainerProps> {
  render() {
    return (
      <DashBoard>
        <Left>
          <TasklistsContainer />
          <TasklistCreateButton onClick={this.props.createTasklist} />
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  createTasklist: () => dispatch(tasklistActions.createTasklist())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
