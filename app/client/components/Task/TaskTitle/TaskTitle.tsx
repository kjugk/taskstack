import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import { Input, Button, Icon } from 'semantic-ui-react';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
`;

const Title = styled<{ completed: boolean }, any>('div')`
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  word-break: break-word;
  margin-right: 1rem;
  ${(props) => props.completed && 'text-decoration: line-through; color: #ccc'};
`;

interface TaskTitleProps {
  task: types.TaskState;
  onSubmit(id: number, params: any): any;
}

interface TaskTitleState {
  title: string;
  isEditing: boolean;
}

class TaskTitle extends React.Component<TaskTitleProps, TaskTitleState> {
  private input: any;

  constructor(props: TaskTitleProps) {
    super(props);

    this.state = {
      title: props.task.title,
      isEditing: false
    };
  }

  render() {
    const { title, isEditing } = this.state;

    return (
      <Container>
        <div style={{ flex: 1 }}>
          {isEditing && this.renderInput()}
          {!isEditing && (
            <Title completed={this.props.task.completed} onClick={this.handleEdit.bind(this)}>
              {title}
            </Title>
          )}
        </div>

        <Button.Group size="mini">{this.renderButtons()}</Button.Group>
      </Container>
    );
  }

  private renderInput() {
    return (
      <Input
        ref={(r: any) => (this.input = r)}
        style={{ width: '100%' }}
        size="mini"
        value={this.state.title}
        onChange={(e) => {
          this.setState({ title: e.currentTarget.value });
        }}
      />
    );
  }

  private renderButtons() {
    if (this.state.isEditing) {
      return (
        <>
          <Button icon primary onClick={this.handleSubmit.bind(this)}>
            <Icon name="check" />
          </Button>
          <Button icon onClick={this.handleCancel.bind(this)}>
            <Icon name="close" />
          </Button>
        </>
      );
    } else {
      return (
        <Button icon onClick={this.handleEdit.bind(this)}>
          <Icon name="pencil" />
        </Button>
      );
    }
  }

  private handleSubmit() {
    this.props.onSubmit(this.props.task.id, { title: this.state.title });
    this.setState({ isEditing: false });
  }

  private handleEdit() {
    this.setState({ isEditing: true });
  }

  private handleCancel() {
    const initialTitle = this.props.task.title;
    this.setState({ title: initialTitle, isEditing: false });
  }
}

export { TaskTitle };
