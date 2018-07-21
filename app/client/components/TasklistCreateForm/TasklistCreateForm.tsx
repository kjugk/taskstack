import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

interface CreateFormProps {
  title: string;
  canDestroy: boolean;
  onDestroyClick?(): any;
  onTitleChange: (title: string) => any;
  onSubmit: () => any;
}

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class TasklistForm extends React.Component<CreateFormProps> {
  render() {
    const { title, onTitleChange, onSubmit, canDestroy, onDestroyClick } = this.props;

    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Form.Field>
          <label>タイトル</label>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              onTitleChange(e.target.value);
            }}
          />
        </Form.Field>

        <ActionsContainer>
          <Button primary disabled={title.trim() === ''} type="submit">
            保存
          </Button>

          {canDestroy && (
            <Button onClick={onDestroyClick} type="button">
              削除
            </Button>
          )}
        </ActionsContainer>
      </Form>
    );
  }
}

export { TasklistForm };
