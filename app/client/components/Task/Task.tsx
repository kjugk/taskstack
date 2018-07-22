import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { Icon, Form } from 'semantic-ui-react';

const Container = styled.div`
  height: 100%;
  width: 320px;
  border-left: 1px solid #eee;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 0 1rem;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
`;

const CloseIcon = styled(Icon)`
  margin-top: 2px;
  cursor: pointer;
`;

const Contents = styled('div')`
  padding: 1rem;
`;

interface TaskProps {
  task: types.TaskState;
  onCloseClick(): any;
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
    const { task, onCloseClick } = this.props;

    return (
      <Container>
        <TitleContainer>
          <Title>{task.title}</Title>
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
}

export { Task };
