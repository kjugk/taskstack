import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Modal, Loader, Dimmer } from 'semantic-ui-react';
import { TasklistForm } from '../TasklistForm/TasklistForm';
import * as formActions from '../../actions/tasklistCreateFormActions';
import { Redirect, withRouter } from 'react-router-dom';

interface TasklistCreateFormContainerProps {
  formState: types.TasklistCreateFormState;
  history: any;
  changeTitle(title: string): any;
  submit(params: object): any;
  close(): any;
}

/**
 * Tasklist 作成フォーム
 */
class TasklistCreateFormContainer extends React.Component<TasklistCreateFormContainerProps> {
  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const { formState, changeTitle, history } = this.props;

    if (formState.isSubmitted) return <Redirect to="/" />;

    return (
      <Modal
        open={true}
        onClose={() => {
          history.goBack();
        }}
        closeOnEscape={!formState.isSubmitting}
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

          <TasklistForm
            title={formState.title}
            onTitleChange={changeTitle}
            onSubmit={this.handleSubmit.bind(this)}
            canDestroy={false}
          />
        </Modal.Content>
      </Modal>
    );
  }

  private handleSubmit() {
    const { formState, submit } = this.props;

    submit({
      title: formState.title
    });
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => ({
  formState: state.tasklistCreateForm
});

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(formActions.changeTitle(title)),
  submit: (params: {}) => dispatch(formActions.submit(params)),
  close: () => dispatch(formActions.close())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistCreateFormContainer)
);
