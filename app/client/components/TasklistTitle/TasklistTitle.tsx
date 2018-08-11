import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Count } from './Count/Count';

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
`;

interface TasklistTitleProps {
  tasklist: types.TasklistState | undefined;
}

class TasklistTitle extends React.Component<TasklistTitleProps> {
  render() {
    const { tasklist } = this.props;

    if (!tasklist) return null;

    return (
      <Wrapper>
        <Title>{tasklist.title}</Title>
        <Count count={tasklist.taskCount} />
      </Wrapper>
    );
  }
}

export { TasklistTitle };
