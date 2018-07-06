import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { CreateForm } from '../../components/tasklist/CreateForm';

interface TasklistCreateFormContainerProps {
  formState: types.TasklistCreateFormState;
}

class TasklistCreateFormContainer extends React.Component<TasklistCreateFormContainerProps> {
  render() {
    const { formState } = this.props;

    return (
      <Modal open={true} onClose={() => alert('close!!!')}>
        <Modal.Header>リストを作成</Modal.Header>
        <Modal.Content>
          <CreateForm
            title={formState.title}
            onTitleChange={(t) => alert(t)}
            onSubmit={() => alert('submit')}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  return {
    formState: state.tasklistCreateForm
  };
};

export default connect(mapStateToProps)(TasklistCreateFormContainer);
