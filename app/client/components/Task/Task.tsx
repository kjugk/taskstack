import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { Modal } from 'semantic-ui-react';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 2rem;
`;

interface TaskProps {
  task: types.TaskState;
  onCloseClick(): any;
  onUpdate(id: number, params: any): any;
  onDestroy(id: number): any;
}

interface TaskState {
  title: string;
  memo: string;
  isTitleEditing: boolean;
  isEditing: boolean;
}

class Task extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      title: props.task.title,
      memo: props.task.memo,
      isEditing: false,
      isTitleEditing: false
    };
  }

  render() {
    const { task, onCloseClick } = this.props;

    return (
      <Modal open={true} onClose={onCloseClick} size="tiny">
        <Modal.Header>
          <TitleContainer>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={this.handleCheckChange.bind(this)}
              style={{ marginRight: '1.4rem' }}
            />
            <TaskTitle
              title={this.state.title}
              isEditing={this.state.isTitleEditing}
              onClick={() => this.setState({ isTitleEditing: !this.state.isTitleEditing })}
              onChange={(title) => this.setState({ title })}
              onSubmit={(title) => {
                this.setState({ isTitleEditing: false });
                alert('submit');
              }}
            />
          </TitleContainer>
        </Modal.Header>

        <Modal.Content>
          <Form>
            <Form.TextArea label="メモ" value={this.state.memo} />
          </Form>

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
