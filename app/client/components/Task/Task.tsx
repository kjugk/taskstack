import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Icon, Form } from 'semantic-ui-react';
import { TaskTitle } from './TaskTitle/TaskTitle';

const Container = styled.div`
  height: 100%;
  width: 320px;
  border-left: 1px solid #eee;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 1rem;
  background: #eee;
  align-items: center;
  min-height: 2rem;
`;

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
`;

const Contents = styled('div')`
  padding: 1rem;
`;

interface TaskProps {
  task: types.TaskState;
  onCloseClick(): any;
  onUpdate(id: number, params: any): any;
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
      <Container>
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
            onSubmit={() => {
              this.setState({ isTitleEditing: false });
              alert('submit');
            }}
          />

          <CloseIcon onClick={onCloseClick} name="close" size="large" />
        </TitleContainer>
        <Contents>
          <Form>
            <Form.TextArea label="メモ" value={this.state.memo} />
          </Form>
        </Contents>
      </Container>
    );
  }

  private handleCheckChange(e: any) {
    e.preventDefault();
    const { task, onUpdate } = this.props;
    onUpdate(task.id, { completed: !task.completed });
  }
}

export { Task };
