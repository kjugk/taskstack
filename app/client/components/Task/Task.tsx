import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { TaskCloseButton } from './TaskCloseButton/TaskCloseButton';
import { TaskDeleteButton } from './TaskDeleteButton/TaskDeleteButton';

const Wrapper = styled<{ open: boolean }, any>('div')`
  height: 100%;
  padding: 1rem 1rem 1rem 0;
  position: relative;
  ${(props) => `background: ${props.theme.lightGrey}`};
  @media (min-width: 787px) {
    width: 0;
    transform: translateX(100%);
    transition: all .25s linear;
    will-change: transform;
    ${(props) => props.open && 'transform: translateX(0); width: 360px;'};
  }

   @media (max-width: 786px) {
     padding: 1rem;
     position: absolute;
     width: 100%;
     left: 0;
     top; 0;
  }
`;

const Container = styled<{ open: boolean }, any>('div')`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  ${(props) => `border: 1px solid ${props.theme.border}`};
  ${(props) => `background: ${props.theme.grey}`};
`;

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  min-height: 2rem;
  padding: 1rem;
  ${(props) => `background: ${props.theme.white}`};
  ${(props) => `border-bottom: 1px solid ${props.theme.border}`};
`;

const Contents = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
  ${(props) => `background: ${props.theme.white}`};
  ${(props) => `border-top: 1px solid ${props.theme.border}`};
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
      <Wrapper open={open}>
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
      </Wrapper>
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
