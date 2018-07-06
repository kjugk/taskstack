import * as React from 'react';
import styled from 'styled-components';
import TasklistListContainer from '../TasklistListContainer';
import TasklistCreateFormContainer from '../TasklistCreateFormContainer';

const DashBoard = styled.div`
  height: 100%;
`;

const Left = styled.div`
  width: 300px;
  height: 100%;
  float: left;
  position: relative;
`;

const Right = styled.div`
  height: 100%;
  overflow: hidden;
`;

class DashboardContainer extends React.Component {
  render() {
    return (
      <DashBoard>
        <Left>
          <TasklistListContainer />
        </Left>
        <Right />
        <TasklistCreateFormContainer />
      </DashBoard>
    );
  }
}

export { DashboardContainer };
