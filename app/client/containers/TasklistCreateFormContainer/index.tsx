import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal, Loader, Dimmer } from 'semantic-ui-react';
import { CreateForm } from '../../components/tasklist/CreateForm';
import * as formActions from '../../actions/tasklistCreateFormActions';

interface TasklistCreateFormContainerProps {
  formState: types.TasklistCreateFormState;
  closeForm: () => any;
  changeTitle: (title: string) => any;
  submit: (params: object) => any;
}

class TasklistCreateFormContainer extends React.Component<TasklistCreateFormContainerProps> {
  render() {
    const { formState, changeTitle, submit, closeForm } = this.props;

    return (
      <Modal
        open={formState.active}
        onClose={closeForm}
        closeOnDimmerClick={!formState.isSubmitting}
        size="tiny"
      >
        <Modal.Header>リストを作成</Modal.Header>
        <Modal.Content>
          {formState.isSubmitting && (
            <Dimmer active>
              <Loader inline="centered">Loading</Loader>
            </Dimmer>
          )}

          <CreateForm
            title={formState.title}
            onTitleChange={changeTitle}
            onSubmit={() => {
              submit({
                title: formState.title
              });
            }}
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
  closeForm: () => dispatch(formActions.close()),
  submit: (params: {}) => dispatch(formActions.submit(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasklistCreateFormContainer);
