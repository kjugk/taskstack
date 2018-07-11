import * as React from 'react';
import styled from 'styled-components';
import TasklistListContainer from '../TasklistListContainer';
import TasklistCreateFormContainer from '../TasklistCreateFormContainer';
import TasklistEditFormContainer from '../TasklistEditFormContainer';
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
  width: 300px;
  background: #eee;
`;

const Right = styled.div`
  height: 100%;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  padding: 0.6rem;
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
          <ButtonContainer>
            <Button fluid primary icon onClick={this.props.createTasklist}>
              <Icon name="plus" /> リストを作成
            </Button>
          </ButtonContainer>
        </Left>

        <Right />

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
