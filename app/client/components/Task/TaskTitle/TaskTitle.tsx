import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

const Title = styled<{ completed: boolean }, any>('h2')`
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  overflow-x: hidden;
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
  errorMessage: string;
}

class TaskTitle extends React.Component<TaskTitleProps, TaskTitleState> {
  private input: any;

  constructor(props: TaskTitleProps) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      title: props.task.title,
      isEditing: false,
      errorMessage: ''
    };
  }

  componentDidUpdate(prevProps: TaskTitleProps, prevState: TaskTitleState) {
    // 選択済みtask が変更された場合
    if (prevProps.task.id !== this.props.task.id && this.props.task) {
      const title = this.props.task.title;
      this.setState({
        title,
        isEditing: false
      });
    }

    if (!prevState.isEditing && this.state.isEditing) {
      if (this.input) {
        this.input.focus();
      }
    }
  }

  render() {
    const { title, isEditing } = this.state;

    return (
      <div style={{ flex: 1, marginLeft: '.5rem' }}>
        {isEditing && this.renderInput()}
        {!isEditing && (
          <Title completed={this.props.task.completed} onClick={this.handleEdit}>
            {title}
          </Title>
        )}
      </div>
    );
  }

  private renderInput() {
    return (
      <>
        <Input
          ref={(r: any) => (this.input = r)}
          style={{ width: '100%', fontSize: '1rem' }}
          size="mini"
          value={this.state.title}
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) {
              this.handleSubmit();
              return;
            }
            if (e.keyCode === 27) {
              this.handleCancel();
              return;
            }
          }}
          onBlur={this.handleSubmit}
          onChange={this.handleInputChange}
        />
        {this.state.errorMessage && <Message error content={this.state.errorMessage} />}
      </>
    );
  }

  private handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    this.setState(() => ({
      title: value,
      errorMessage: validate(value)
    }));
  }

  private handleSubmit() {
    if (this.state.errorMessage) {
      return;
    }

    if (this.state.title !== this.props.task.title) {
      this.props.onSubmit(this.props.task.id, { title: this.state.title });
    }

    this.setState(() => ({ isEditing: false }));
  }

  private handleEdit() {
    this.setState(() => ({ isEditing: true }));
  }

  private handleCancel() {
    this.setState((prevState, props) => ({
      title: props.task.title,
      isEditing: false,
      errorMessage: ''
    }));
  }
}

const validate = (title: string): string => {
  if (title.trim() === '') {
    return '必須項目です。';
  }

  if (title.length > 100) {
    return '100文字以内で入力してください。';
  }

  return '';
};

export { TaskTitle };
