import * as React from 'react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import styled from 'styled-components';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

interface TasklistFormProps {
  title: string;
  canDestroy: boolean;
  onClickDestroy?(): any;
  onChangeTitle(title: string): any;
  onClickClose(): any;
  onSubmit(): any;
}

interface State {
  errorMessage: string;
}

const ActionsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
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
    const { title, onChangeTitle, onSubmit, canDestroy, onClickDestroy, onClickClose } = this.props;

    return (
      <Form
        error={!!this.state.errorMessage}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Form.Field>
          <label>タイトル</label>
          <input
            ref={(r) => (this.input = r)}
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              onChangeTitle(value);
              this.setState(() => ({
                errorMessage: validate(value)
              }));
            }}
          />
          <Message error content={this.state.errorMessage} />
        </Form.Field>

        <ActionsContainer>
          <div style={{ flex: 1 }}>
            {canDestroy && (
              <Button
                basic
                content="削除"
                color="red"
                onClick={onClickDestroy}
                size="tiny"
                type="button"
              />
            )}
          </div>
          <div>
            <Button basic content="キャンセル" size="tiny" type="button" onClick={onClickClose} />
            <Button
              primary
              disabled={title.trim() === '' || !!this.state.errorMessage}
              icon="check"
              content="保存"
              size="tiny"
              type="submit"
            />
          </div>
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
