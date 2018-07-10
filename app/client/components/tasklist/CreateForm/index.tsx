import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

interface CreateFormProps {
  title: string;
  onTitleChange: (title: string) => any;
  onSubmit: () => any;
}

const ActionsContainer = styled.div`
  text-align: right;
`;

class TasklistForm extends React.Component<CreateFormProps> {
  render() {
    const { title, onTitleChange, onSubmit } = this.props;

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
          <Button disabled={title.trim() === ''} type="submit">
            保存
          </Button>
        </ActionsContainer>
      </Form>
    );
  }
}

export { TasklistForm };
