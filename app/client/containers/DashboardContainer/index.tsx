import * as React from 'react';
import styled from 'styled-components';
import TasklistListContainer from '../TasklistListContainer';

import { Icon } from 'semantic-ui-react';

const DashBoard = styled.div`
  height: 100%;
`;

const Left = styled.div`
  width: 200px;
  height: 100%;
  float: left;
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
          <Icon name="users" />
          <TasklistListContainer />
        </Left>
        <Right />
      </DashBoard>
    );
  }
}

export { DashboardContainer };
