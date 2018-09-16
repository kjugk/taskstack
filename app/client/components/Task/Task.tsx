import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { TaskActions } from './TaskActions/TaskActions';
import Checkbox from '../Checkbox/Checkbox';

const TRANSITION_DURATION = 180;

const Wrapper = styled<{ open: boolean }, any>('div')`
  transition: all ${TRANSITION_DURATION}ms linear;

  @media (min-width: 787px) {
    height: 100%;
    padding: 1rem;
    padding-left: 0;
    transform: translateX(100%);
    width: 0;
    ${(props) => `
      ${props.open && 'transform: translate3D(0, 0, 0); width: 360px;'}
      background: ${props.theme.lightGrey};
    `};
  }

  @media (max-width: 786px) {
    background: rgba(0, 0, 0, 0);
    bottom: 0;
    left: 0;
    padding: 1rem;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    z-index: 3;
    ${(props) => props.open && 'background: rgba(0, 0, 0, 0.5)'};
  }
`;

const Container = styled<{ open: boolean }, any>('div')`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  ${(props) => `
    background: ${props.theme.grey};
    border: 1px solid ${props.theme.border};
  `};

  @media (min-width: 787px) {
    width: 344px;
  }

  @media (max-width: 786px) {
    transform: translateX(100%);
    transition: all ${TRANSITION_DURATION}ms linear;
    ${(props) => props.open && 'transform: translate3D(0, 0, 0);'};
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
  overflow-y: scroll;
  padding: 1rem;
`;

interface Props {
  open: boolean;
  task: types.TaskState;
  onClose(): any;
  onDestroy(id: number): any;
  onHide(): any;
  onUpdate(id: number, params: any): any;
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
      }, TRANSITION_DURATION);
    }
  }

  render() {
    const { open, task, onUpdate, onClose, onDestroy } = this.props;

    return (
      <Wrapper open={open}>
        <Container open={open} onClick={(e: any) => e.stopPropagation()}>
          <TitleContainer>
            <Checkbox checked={task.completed} onClick={this.handleCheckChange} />
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

  private handleCheckChange() {
    const { task, onUpdate } = this.props;
    if (!task) return;

    onUpdate(task.id, { completed: !task.completed });
  }
}

export { Task };
