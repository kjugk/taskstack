import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal, Loader, Dimmer } from 'semantic-ui-react';
import { TasklistForm } from '../../components/tasklist/CreateForm';
import * as formActions from '../../actions/tasklistEditFormActions';

interface TasklistEditFormContainerProps {
  formState: types.TasklistEditFormState;
  closeForm(): any;
  changeTitle(title: string): any;
  destroyTasklist(id: number): any;
  submit(id: number, params: object): any;
}

/**
 * Tasklist 編集フォーム
 */
class TasklistEditFormContainer extends React.Component<TasklistEditFormContainerProps> {
  render() {
    const { formState, changeTitle, closeForm, destroyTasklist } = this.props;

    return (
      <Modal
        open={formState.active}
        onClose={closeForm}
        closeOnEscape={!formState.isSubmitting}
        closeOnDimmerClick={!formState.isSubmitting}
        size="tiny"
      >
        <Modal.Header>リストを編集</Modal.Header>
        <Modal.Content>
          {formState.isSubmitting && (
            <Dimmer active>
              <Loader inline="centered">Loading</Loader>
            </Dimmer>
          )}

          <TasklistForm
            title={formState.title}
            onTitleChange={changeTitle}
            onSubmit={this.handleSubmit.bind(this)}
            canDestroy={true}
            onDestroyClick={() => {
              if (window.confirm('本当に削除しますか?')) {
                destroyTasklist(formState.id);
              }
            }}
          />
        </Modal.Content>
      </Modal>
    );
  }

  private handleSubmit() {
    const { formState, submit } = this.props;

    submit(formState.id, {
      title: formState.title
    });
  }
}

const mapStateToProps = (state: types.RootState) => ({
  formState: state.tasklistEditForm
});

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(formActions.changeTitle(title)),
  closeForm: () => dispatch(formActions.close()),
  destroyTasklist: (id: number) => dispatch(formActions.destroyTasklist(id)),
  submit: (id: number, params: {}) => dispatch(formActions.submit(id, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasklistEditFormContainer);
