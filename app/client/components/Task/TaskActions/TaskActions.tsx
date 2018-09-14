import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import { TaskCloseButton } from '../TaskCloseButton/TaskCloseButton';
import { TaskDeleteButton } from '../TaskDeleteButton/TaskDeleteButton';

const Container = styled.div`
  align-items: center;
  border-radius: 0 0 4px 4px;
  display: flex;
  padding: 1rem;
  ${(props) => `
    background: ${props.theme.white};
    border-top: 1px solid ${props.theme.border};
  `};
`;

const CreatedAt = styled.div`
  font-size: 0.8rem;
  margin-right: 4px;
  text-align: center;
  flex: 1;
  ${(props) => `color: ${props.theme.black};`};
`;

interface Props {
  task: types.TaskState;
  onClickClose(): any;
  onClickDestroy(id: number): any;
}

const TaskActions: React.SFC<Props> = ({ task, onClickClose, onClickDestroy }) => (
  <Container>
    <TaskCloseButton onClick={onClickClose} />
    <CreatedAt>作成日 : {task.createdAt}</CreatedAt>
    <TaskDeleteButton
      onClick={() => {
        if (window.confirm('削除しますか?')) {
          onClickDestroy(task.id);
        }
      }}
    />
  </Container>
);

export { TaskActions };
