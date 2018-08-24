import * as React from 'react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import FormField from 'semantic-ui-react/dist/commonjs/collections/Form/FormField';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import styled from 'styled-components';

interface TasklistFormProps {
  title: string;
  canDestroy: boolean;
  onDestroyClick?(): any;
  onTitleChange(title: string): any;
  onSubmit(): any;
}

const ActionsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

class TasklistForm extends React.Component<TasklistFormProps> {
  private input: any;

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { title, onTitleChange, onSubmit, canDestroy, onDestroyClick } = this.props;

    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <FormField>
          <label>タイトル</label>

          <input
            ref={(r) => (this.input = r)}
            type="text"
            value={title}
            onChange={(e) => {
              onTitleChange(e.target.value);
            }}
          />
        </FormField>

        <ActionsContainer>
          <Button
            primary
            icon="check"
            disabled={title.trim() === ''}
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

export { TasklistForm };
