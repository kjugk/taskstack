import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { TaskActions } from './TaskActions/TaskActions';

const Wrapper = styled<{ open: boolean }, any>('div')`
  height: 100%;
  @media (min-width: 787px) {
    transform: translateX(100%);
    transition: all .25s linear;
    padding: 1rem;
    padding-left: 0;
    width: 0;
    ${(props) => props.open && 'transform: translateX(0); width: 360px;'};
    ${(props) => `background: ${props.theme.lightGrey}`};
  }

   @media (max-width: 786px) {
     background: rgba(0,0,0,0.5);
     bottom: 0;
     padding: 1rem;
     position: absolute;
     left: 0;
     top; 0;
     width: 100%;
     ${(props) => props.open && 'transform: translateX(0);'};
  }
`;

const Container = styled<{ open: boolean }, any>('div')`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 344px;
  ${(props) => `
    border: 1px solid ${props.theme.border};
    background: ${props.theme.grey};
  `};
  @media (max-width: 786px) {
    width: 100%;
    ${(props) => `border: 1px solid ${props.theme.border}`};
  }
`;

const TitleContainer = styled.div`
  align-items: center;
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  padding: 1rem;
  ${(props) => `
    background: ${props.theme.white};
    border-bottom: 1px solid ${props.theme.border}
  `};
`;

const Contents = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: scroll;
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
    const { open, task, onUpdate, onClose, onDestroy } = this.props;

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

          <TaskActions task={task} onClickClose={onClose} onClickDestroy={onDestroy} />
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
