import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TasklistTitleCount } from './TasklistTitleCount/TasklistTitleCount';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  min-height: 3rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
  line-height: 1;
`;

const Hamberger: React.SFC<{ onClick(): any }> = ({ onClick }) => (
  <Icon name="sidebar" size="big" style={{ cursor: 'pointer' }} onClick={onClick} />
);

interface TasklistTitleProps {
  tasklist: types.TasklistState;
  onHambergerClick(): any;
}

class TasklistTitle extends React.Component<TasklistTitleProps> {
  render() {
    const { tasklist, onHambergerClick } = this.props;

    if (!tasklist) return null;

    return (
      <Wrapper>
        <Responsive as={Hamberger} maxWidth={767} onClick={onHambergerClick} />
        <TasklistTitleCount count={tasklist.taskCount} />
        <Title>{tasklist.title}</Title>
      </Wrapper>
    );
  }
}

export { TasklistTitle };
