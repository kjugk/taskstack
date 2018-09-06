import * as React from 'react';
import * as types from '../../types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

interface Props {
  formState: types.TaskCreateFormState;
  onSubmit(e: React.FormEvent<HTMLFormElement>): any;
  onTitleChange(title: string): any;
}

interface State {
  errorMessage: string;
}

class TaskCreateForm extends React.Component<Props, State> {
  private input: any;

  constructor(props: Props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errorMessage: ''
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { formState } = this.props;

    // 連続入力をやりやすくするために、submit 後に focus させている。
    if (prevProps.formState.isSubmitting && !formState.isSubmitting) {
      this.input.focus();
    }
  }

  render() {
    const { formState } = this.props;

    return (
      <Form error={!!this.state.errorMessage} onSubmit={this.handleSubmit}>
        <Input
          disabled={formState.isSubmitting}
          fluid
          icon="plus"
          iconPosition="left"
          onChange={this.handleInputChange}
          placeholder="タスクを作成"
          size="large"
          value={formState.title}
          ref={(ref) => (this.input = ref)}
        />
        <Message error content={this.state.errorMessage} />
      </Form>
    );
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!!this.state.errorMessage) {
      return;
    } else {
      this.props.onSubmit(e);
    }
  }

  private handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    this.setState(() => ({
      errorMessage: validate(value)
    }));

    this.props.onTitleChange(value);
  }
}

const validate = (title: string) => {
  if (typeof title === 'undefined') return '';

  if (title.length > 10) {
    return '100文字以内で入力してください';
  }

  return '';
};

export { TaskCreateForm };
