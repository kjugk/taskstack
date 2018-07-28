import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import { Form, Button, Icon, Message } from 'semantic-ui-react';

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

const ButtonContainer = styled.div`
  text-align: right;
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
  constructor(props: TaskMemoProps) {
    super(props);

    this.state = {
      memo: props.task.memo,
      isEditing: false
    };
  }

  render() {
    return (
      <>
        <HeaderContainer>メモ</HeaderContainer>

        <MemoContainer>{this.renderMemo()}</MemoContainer>

        <ButtonContainer>
          <Button.Group size="mini">{this.renderButtons()}</Button.Group>
        </ButtonContainer>
      </>
    );
  }

  private renderMemo() {
    if (this.state.isEditing) {
      return (
        <Form>
          <Form.TextArea
            value={this.state.memo}
            placeholder="メモを追加"
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
