import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';

interface CreateFormProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
}

class CreateForm extends React.Component<CreateFormProps> {
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

        <Button disabled={title.trim() === ''} type="button">
          作成
        </Button>
      </Form>
    );
  }
}

export { CreateForm };
