import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskMemo } from './TaskMemo/TaskMemo';
import { Modal } from 'semantic-ui-react';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 2rem;
  flex-direction: row;
`;

interface TaskProps {
  task: types.TaskState;
  onCloseClick(): any;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
}

interface TaskState {
  memo: string;
  isEditing: boolean;
}

class Task extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      memo: props.task.memo,
      isEditing: false
    };
  }

  render() {
    const { task, onCloseClick, onUpdate } = this.props;

    return (
      <Modal open={true} onClose={onCloseClick} size="small">
        <Modal.Header>
          <TitleContainer>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={this.handleCheckChange.bind(this)}
              style={{ marginRight: '1.4rem' }}
            />
            <TaskTitle task={task} onSubmit={onUpdate} />
          </TitleContainer>
        </Modal.Header>

        <Modal.Content>
          <TaskMemo task={task} onSubmit={onUpdate} />
        </Modal.Content>

        <Modal.Actions>
          <Button
            onClick={() => {
              if (window.confirm('削除しますか?')) {
                this.props.onDestroy(task.id);
              }
            }}
          >
            delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  private handleCheckChange(e: any) {
    e.preventDefault();

    const { task, onUpdate } = this.props;
    onUpdate(task.id, { completed: !task.completed });
  }
}

export { Task };
