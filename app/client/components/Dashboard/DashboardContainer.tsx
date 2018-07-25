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
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  height: 100%;
  position: relative;
  width: 260px;
  background: #eee;
`;

const Right = styled.div`
  height: 100%;
  overflow: hidden;
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

        <Right>
          <TaskCreateFormContainer />
          <TaskListContainer />
        </Right>

        <TaskContainer />
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
