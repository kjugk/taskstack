import * as React from 'react';
import styled from 'styled-components';
import TasklistListContainer from '../TasklistList/TasklistListContainer';
import TasklistCreateFormContainer from '../TasklistCreateForm/TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditForm/TasklistEditFormContainer';
import TaskListContainer from '../tasklist/TaskListContainer';
import TaskCreateFormContainer from '../TaskCreateForm/TaskCreateFormContainer';
import TaskContainer from '../Task/TaskContainer';
import { Button, Icon } from 'semantic-ui-react';
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
          <TasklistListContainer />
          <Button
            fluid
            primary
            icon
            onClick={this.props.createTasklist}
            size="huge"
            style={{ borderRadius: 0 }}
          >
            <Icon name="plus" /> リストを作成
          </Button>
        </Left>

        <Center>
          <TaskCreateFormContainer />
          <TaskListContainer />
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
