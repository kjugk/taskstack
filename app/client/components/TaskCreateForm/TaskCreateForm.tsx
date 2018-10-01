import * as React from 'react';
import * as types from '../../types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 5rem;
`;

const InputWrapper = styled<{ focuced: boolean }, any>('div')`
  border-radius: 0.25rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  ${(props) => `
    background: ${props.theme.grey};
  `};
  ${(props) =>
    props.focuced &&
    `
    background: ${props.theme.white};
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.24);
    border: 1px solid ${props.theme.border};
  `};
`;

interface Props {
  formState: types.TaskCreateFormState;
  tasklist: types.TasklistState;
  onClear(): any;
  onSubmit(e: React.FormEvent<HTMLFormElement>): any;
  onTitleChange(title: string): any;
}

interface State {
  errorMessage: string;
  focused: boolean;
}

class TaskCreateForm extends React.Component<Props, State> {
  private input: any;

  constructor(props: Props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errorMessage: '',
      focused: false
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
    const { formState, tasklist } = this.props;

    return (
      <Wrapper>
        <Form error={!!this.state.errorMessage} onSubmit={this.handleSubmit}>
          <InputWrapper focuced={this.state.focused}>
            <Input
              disabled={formState.isSubmitting}
              fluid
              icon="plus"
              iconPosition="left"
              onChange={this.handleInputChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder={`タスクを「${tasklist.title}」に追加`}
              ref={(ref) => (this.input = ref)}
              transparent
              value={formState.title}
            />
          </InputWrapper>
          <Message error content={this.state.errorMessage} />
        </Form>
      </Wrapper>
    );
  }

  private handleFocus() {
    this.setState(() => ({ focused: true }));
  }

  private handleBlur() {
    this.setState(() => ({ focused: false }));
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

  if (title.length > 100) {
    return '100文字以内で入力してください';
  }

  return '';
};

export { TaskCreateForm };
