import * as React from 'react';
import * as types from '../../types';
import * as formActions from '../../actions/tasklistCreateFormActions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Loader, Dimmer, Transition } from 'semantic-ui-react';
import { TasklistForm } from '../TasklistForm/TasklistForm';
import { Redirect, withRouter } from 'react-router-dom';

interface Props {
  formState: types.TasklistCreateFormState;
  history: any;
  changeTitle(title: string): any;
  submit(params: object): any;
  close(): any;
}

interface State {
  open: boolean;
}

/**
 * Tasklist 作成フォーム
 */
class TasklistCreateFormContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({ open: true }));
  }

  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const { formState, changeTitle, history } = this.props;

    if (formState.isSubmitted) return <Redirect to="/tasklists" />;

    return (
      <Transition
        visible={this.state.open}
        animation="fade up"
        duration={120}
        onHide={() => history.goBack()}
      >
        <Modal
          open={true}
          onClose={() => this.setState(() => ({ open: false }))}
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
              onSubmit={this.handleSubmit}
              canDestroy={false}
            />
          </Modal.Content>
        </Modal>
      </Transition>
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
  formState: state.tasklistCreateForm,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeTitle: (title: string) => formActions.changeTitle(title),
      submit: (params: {}) => formActions.submit(params),
      close: () => formActions.close()
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistCreateFormContainer)
);
