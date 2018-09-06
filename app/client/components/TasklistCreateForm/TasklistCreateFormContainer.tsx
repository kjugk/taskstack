import * as React from 'react';
import * as types from '../../types';
import * as formActions from '../../actions/tasklistCreateFormActions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';
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
        animation="fade down"
        duration={180}
        visible={this.state.open}
        onHide={() => history.goBack()}
        unmountOnHide={true}
      >
        <Modal
          centered={false}
          closeOnEscape={!formState.isSubmitting}
          closeOnDimmerClick={!formState.isSubmitting}
          open={true}
          size="tiny"
          onClose={() => this.setState(() => ({ open: false }))}
        >
          <Modal.Header>リストを作成</Modal.Header>
          <Modal.Content>
            {formState.isSubmitting && (
              <Dimmer active>
                <Loader inline="centered">Loading</Loader>
              </Dimmer>
            )}

            <TasklistForm
              canDestroy={false}
              title={formState.title}
              onTitleChange={changeTitle}
              onSubmit={this.handleSubmit}
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
