import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import { Form, TextArea, Message } from 'semantic-ui-react';

const HeaderContainer = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const MemoContainer = styled.div`
  margin-bottom: 1rem;
  min-height: 5.4rem;
`;

const Memo = styled(Message)`
  cursor: pointer;
  min-height: 5.4rem !important;
`;

interface TaskMemoProps {
  task: types.TaskState;
  onSubmit(id: number, params: any): any;
}

interface TaskMemoState {
  memo: string;
  isEditing: boolean;
}

class TaskMemo extends React.Component<TaskMemoProps, TaskMemoState> {
  private input: any;

  constructor(props: TaskMemoProps) {
    super(props);

    this.state = {
      memo: props.task.memo,
      isEditing: false
    };
  }

  componentDidUpdate(prevProps: TaskMemoProps, prevState: TaskMemoState) {
    if (!prevState.isEditing && this.state.isEditing) {
      if (this.input) {
        this.input.focus();
      }
    }
  }

  render() {
    return (
      <>
        <HeaderContainer>メモ</HeaderContainer>
        <MemoContainer>{this.renderMemo()}</MemoContainer>
      </>
    );
  }

  private renderMemo() {
    if (this.state.isEditing) {
      return (
        <Form>
          <TextArea
            ref={(r: any) => (this.input = r)}
            value={this.state.memo}
            placeholder="メモを追加"
            onBlur={this.handleSubmit.bind(this)}
            onChange={this.handleInputChange.bind(this)}
          />
        </Form>
      );
    } else {
      return (
        <Memo onClick={this.handleEdit.bind(this)}>
          {this.state.memo || <span style={{ color: '#ccc' }}>メモを追加</span>}
        </Memo>
      );
    }
  }

  private handleEdit() {
    this.setState({
      isEditing: true
    });
  }

  private handleCancel() {
    const initialMemo = this.props.task.memo;
    this.setState({
      memo: initialMemo,
      isEditing: false
    });
  }

  private handleInputChange(e: any) {
    e.stopPropagation();

    this.setState({
      memo: e.target.value
    });
  }

  private handleSubmit() {
    this.props.onSubmit(this.props.task.id, { memo: this.state.memo });
    this.setState({
      isEditing: false
    });
  }
}

export { TaskMemo };
