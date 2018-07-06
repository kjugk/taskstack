import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { CreateForm } from '../../components/tasklist/CreateForm';
import * as formActions from '../../actions/tasklistCreateFormActions';

interface TasklistCreateFormContainerProps {
  formState: types.TasklistCreateFormState;
  closeForm: () => any;
  changeTitle: (title: string) => any;
}

class TasklistCreateFormContainer extends React.Component<TasklistCreateFormContainerProps> {
  render() {
    const { formState, changeTitle, closeForm } = this.props;

    return (
      <Modal open={formState.active} onClose={closeForm}>
        <Modal.Header>リストを作成</Modal.Header>
        <Modal.Content>
          <CreateForm
            title={formState.title}
            onTitleChange={changeTitle}
            onSubmit={() => alert('submit')}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  formState: state.tasklistCreateForm
});

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(formActions.changeTitle(title)),
  closeForm: () => dispatch(formActions.close())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasklistCreateFormContainer);
