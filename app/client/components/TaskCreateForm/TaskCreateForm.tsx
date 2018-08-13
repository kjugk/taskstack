import * as React from 'react';
import * as types from '../../types';
import { Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
`;

interface TaskCreateFormProps {
  formState: types.TaskCreateFormState;
  onSubmit(e: React.FormEvent<HTMLFormElement>): any;
  onTitleChange(e: React.SyntheticEvent<HTMLInputElement>): any;
}

class TaskCreateForm extends React.Component<TaskCreateFormProps> {
  private input: any;

  componentDidUpdate(prevProps: TaskCreateFormProps) {
    const { formState } = this.props;

    // 連続入力をやりやすくするために、submit 後に focus させている。
    if (prevProps.formState.isSubmitting && !formState.isSubmitting) {
      this.input.focus();
    }
  }

  render() {
    const { formState, onTitleChange } = this.props;

    return (
      <Container>
        <form onSubmit={(e) => this.props.onSubmit(e)}>
          <Input
            disabled={formState.isSubmitting}
            fluid
            icon={formState.isSubmitting && <Icon loading name="spinner" />}
            onChange={(e) => onTitleChange(e)}
            placeholder="タスクを作成"
            value={formState.title}
            ref={(ref) => (this.input = ref)}
          />
        </form>
      </Container>
    );
  }
}

export { TaskCreateForm };
