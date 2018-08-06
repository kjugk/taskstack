import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal, Loader, Dimmer } from 'semantic-ui-react';
import { TasklistForm } from '../TasklistForm/TasklistForm';
import { getTasklist } from '../../reducers/tasklists';
import * as formActions from '../../actions/tasklistEditFormActions';
import { withRouter, Redirect } from 'react-router-dom';

interface TasklistEditFormContainerProps {
  formState: types.TasklistEditFormState;
  tasklist: types.TasklistState;
  history: any;
  closeForm(): any;
  changeTitle(title: string): any;
  destroyTasklist(id: number): any;
  submit(id: number, params: object): any;
  init(tasklist: types.TasklistState): any;
}

/**
 * Tasklist 編集フォーム
 */
class TasklistEditFormContainer extends React.Component<TasklistEditFormContainerProps> {
  componentDidMount() {
    this.props.init(this.props.tasklist);
  }

  componentWillUnmount() {
    this.props.closeForm();
  }

  render() {
    const { formState, changeTitle, destroyTasklist, tasklist, history } = this.props;

    if (!tasklist) {
      return <Redirect to="/" />;
    }

    if (formState.isSubmitted) {
      return <Redirect to={`/tasklists/${tasklist.id}`} />;
    }

    return (
      <Modal
        open={true}
        onClose={() => history.replace(`/tasklists/${tasklist.id}`)}
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

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);

  return {
    tasklist: getTasklist(tasklistId)(state),
    formState: state.tasklistEditForm
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(formActions.changeTitle(title)),
  closeForm: () => dispatch(formActions.close()),
  destroyTasklist: (id: number) => dispatch(formActions.destroyTasklist(id)),
  submit: (id: number, params: {}) => dispatch(formActions.submit(id, params)),
  init: (tasklist: types.TasklistState) => dispatch(formActions.init(tasklist))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistEditFormContainer)
);
