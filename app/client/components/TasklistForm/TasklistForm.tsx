import * as React from 'react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import FormField from 'semantic-ui-react/dist/commonjs/collections/Form/FormField';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import styled from 'styled-components';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

interface TasklistFormProps {
  title: string;
  canDestroy: boolean;
  onDestroyClick?(): any;
  onTitleChange(title: string): any;
  onSubmit(): any;
}

interface State {
  errorMessage: string;
}

const ActionsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

class TasklistForm extends React.Component<TasklistFormProps, State> {
  private input: any;

  constructor(props: TasklistFormProps) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { title, onTitleChange, onSubmit, canDestroy, onDestroyClick } = this.props;

    return (
      <Form
        error={!!this.state.errorMessage}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label>タイトル</label>
          <input
            ref={(r) => (this.input = r)}
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              onTitleChange(value);
              this.setState(() => ({
                errorMessage: validate(value)
              }));
            }}
          />
          <Message error content={this.state.errorMessage} />
        </div>

        <ActionsContainer>
          <Button
            primary
            disabled={title.trim() === '' || !!this.state.errorMessage}
            icon="check"
            content="保存"
            type="submit"
          />

          {canDestroy && (
            <Button
              basic
              color="red"
              content="削除"
              icon="trash"
              onClick={onDestroyClick}
              type="button"
            />
          )}
        </ActionsContainer>
      </Form>
    );
  }
}

const validate = (title: string): string => {
  if (title.length > 100) {
    return '100文字以内で入力してください。';
  }

  return '';
};

export { TasklistForm };
