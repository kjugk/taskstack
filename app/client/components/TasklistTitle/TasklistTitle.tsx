import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TasklistTitleCount } from './TasklistTitleCount/TasklistTitleCount';
import { Responsive, Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 1rem;
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
        <Title>{tasklist.title}</Title>
        <TasklistTitleCount count={tasklist.taskCount} />
      </Wrapper>
    );
  }
}

export { TasklistTitle };
