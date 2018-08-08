import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { Transition } from 'react-transition-group';

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
`;

interface TaskProps {
  task: types.TaskState | undefined;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
}

class Task extends React.Component<TaskProps> {
  render() {
    const { task, onUpdate } = this.props;

    return (
      <Transition appear in={!!task} timeout={0}>
        {(state: string) => (
          <Container state={state}>
            {task && (
              <>
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
                  <Button
                    basic
                    color="red"
                    content="削除"
                    fluid
                    icon="trash"
                    onClick={() => {
                      if (window.confirm('削除しますか?')) {
                        this.props.onDestroy(task.id);
                      }
                    }}
                  />
                </ButtonContainer>
              </>
            )}
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
