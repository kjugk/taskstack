import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { Transition } from 'react-transition-group';

const Container = styled<{ state: string }, any>('div')`
  border-left: 1px solid #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  transform: translateX(100%);
  transition: all 0.2s linear;
  width: 0px;
  ${(props) => props.state === 'entered' && `transform: translate3D(0,0,0); width: 340px;`};
`;

const TitleContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  min-height: 2rem;
  padding-bottom: 1rem;
`;

const Contents = styled.div`
  flex: 1;
`;

interface TaskProps {
  task: types.TaskState;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
}

class Task extends React.Component<TaskProps> {
  render() {
    const { task, onUpdate } = this.props;

    return (
      <Transition appear in={true} timeout={{ enter: 0, exit: 200 }}>
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
          </Container>
        )}
      </Transition>
    );
  }

  private handleCheckChange(e: any) {
    e.preventDefault();
    const { task, onUpdate } = this.props;
    onUpdate(task.id, { completed: !task.completed });
  }
}

export { Task };
