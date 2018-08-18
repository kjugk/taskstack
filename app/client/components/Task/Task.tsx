import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { TaskCloseButton } from './TaskCloseButton/TaskCloseButton';
import { TaskDeleteButton } from './TaskDeleteButton/TaskDeleteButton';

const Container = styled<{ open: boolean }, any>('div')`
  background: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative
  transform: translateX(100%);
  transition: all .2s;
  @media (min-width: 787px) {
    width: 0;
    ${(props) => props.open && 'transform: translate3d(0, 0, 0); width: 360px;'};
  }

   @media (max-width: 786px) {
     position: absolute;
     width: 100%;
     left: 0;
     top; 0;
     ${(props) => props.open && 'transform: translate3d(0, 0, 0);'};
  }
`;

const TitleContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  min-height: 2rem;
  padding: 1rem;
`;

const Contents = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
`;

interface Props {
  task: types.TaskState;
  open: boolean;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
  onClose(): any;
  onHide(): any;
}

class Task extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  componentDidUpdate(prevProp: Props) {
    if (prevProp.open && !this.props.open) {
      setTimeout(() => {
        this.props.onHide();
      }, 120);
    }
  }

  render() {
    const { open, task, onUpdate } = this.props;

    return (
      <Container open={open} onClick={(e: any) => e.stopPropagation()}>
        <TitleContainer>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={this.handleCheckChange}
            style={{ marginRight: '1.4rem' }}
          />
          <TaskTitle task={task} onSubmit={onUpdate} />
        </TitleContainer>

        <Contents>
          <TaskMemo task={task} onSubmit={onUpdate} />
        </Contents>

        <ButtonContainer>
          <TaskCloseButton onClick={this.props.onClose} />
          <TaskDeleteButton
            onClick={() => {
              if (window.confirm('削除しますか?')) {
                this.props.onDestroy(task.id);
              }
            }}
          />
        </ButtonContainer>
      </Container>
    );
  }

  private handleCheckChange(e: any) {
    e.preventDefault();

    const { task, onUpdate } = this.props;
    if (!task) return;

    onUpdate(task.id, { completed: !task.completed });
  }
}

export { Task };
