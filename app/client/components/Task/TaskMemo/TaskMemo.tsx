import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import TextArea from 'semantic-ui-react/dist/commonjs/collections/Form/FormTextArea';
import Ref from 'semantic-ui-react/dist/commonjs/addons/Ref';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

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

// TODO: move to utils.
const nlToBr = (str: string) =>
  str.split('\n').map((s, i) => (
    <span key={i}>
      {s}
      <br />
    </span>
  ));

class TaskMemo extends React.Component<TaskMemoProps, TaskMemoState> {
  private input: any;

  constructor(props: TaskMemoProps) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      memo: props.task.memo,
      isEditing: false
    };
  }

  componentDidUpdate(prevProps: TaskMemoProps, prevState: TaskMemoState) {
    // 選択済みtask が変更された場合
    if (this.props.task && prevProps.task.id !== this.props.task.id) {
      const memo = this.props.task.memo;
      this.setState(() => ({
        memo,
        isEditing: false
      }));
    }

    if (!prevState.isEditing && this.state.isEditing) {
      if (this.input) {
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) {
          (wrapper.children[0] as HTMLInputElement).focus();
        }
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
          <Ref innerRef={(node) => (this.input = node)}>
            <TextArea
              autoHeight
              className="wrapper"
              placeholder="メモを追加"
              value={this.state.memo}
              onBlur={this.handleSubmit}
              onChange={this.handleInputChange}
              onKeyDown={(e: any) => {
                if (e.keyCode === 27) {
                  this.handleCancel();
                  return;
                }
              }}
            />
          </Ref>
        </Form>
      );
    } else {
      return (
        <Memo onClick={this.handleEdit}>
          {!this.state.memo && <span style={{ color: '#ccc' }}>メモを追加</span>}
          {this.state.memo && nlToBr(this.state.memo)}
        </Memo>
      );
    }
  }

  private handleEdit() {
    this.setState(() => ({ isEditing: true }));
  }

  private handleCancel() {
    const initialMemo = this.props.task.memo;
    this.setState(() => ({
      memo: initialMemo,
      isEditing: false
    }));
  }

  private handleInputChange(e: React.FormEvent<HTMLTextAreaElement>) {
    e.stopPropagation();
    const value = e.currentTarget.value;
    this.setState(() => ({ memo: value }));
  }

  private handleSubmit() {
    if (this.state.memo !== this.props.task.memo) {
      this.props.onSubmit(this.props.task.id, { memo: this.state.memo });
    }

    this.setState(() => ({ isEditing: false }));
  }
}

export { TaskMemo };
