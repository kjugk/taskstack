import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { Transition } from 'react-transition-group';
import { CloseButton } from './CloseButton/CloseButton';
import { DeleteButton } from './DeleteButton/DeleteButton';

const Container = styled<{ state: string }, any>('div')`
  background: #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transform: translateX(100%);
  transition: all 0.2s ease;
  transition-property: transform width;
  width: 0;
  ${(props) => props.state === 'entered' && `transform: translateX(0); width: 360px;`};
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
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
`;

/**
 * TODO onClose を追加
 */
interface TaskProps {
  task: types.TaskState;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
  onClose(): any;
}

interface TaskState {
  open: boolean;
}

class Task extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      open: true
    };
  }

  componentDidUpdate(prevProps: TaskProps, prevState: TaskState) {
    if (prevState.open && !this.state.open) {
      setTimeout(this.props.onClose, 200);
    }
  }

  render() {
    const { task, onUpdate } = this.props;

    return (
      <Transition appear in={this.state.open} timeout={0}>
        {(state: string) => (
          <Container state={state}>
            <TitleContainer>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={this.handleCheckChange.bind(this)}
                style={{ marginRight: '1.4rem' }}
              />
              <TaskTitle task={task} onSubmit={onUpdate} />
            </TitleContainer>

            <Contents>
              <TaskMemo task={task} onSubmit={onUpdate} />
            </Contents>

            <ButtonContainer>
              <CloseButton
                onClick={() => {
                  this.setState({
                    open: false
                  });
                }}
              />
              <DeleteButton
                onClick={() => {
                  if (window.confirm('削除しますか?')) {
                    this.props.onDestroy(task.id);
                  }
                }}
              />
            </ButtonContainer>
          </Container>
        )}
      </Transition>
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
