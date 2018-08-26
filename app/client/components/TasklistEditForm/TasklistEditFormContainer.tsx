import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';
import { TasklistForm } from '../TasklistForm/TasklistForm';
import { getTasklist } from '../../reducers/tasklists';
import * as formActions from '../../actions/tasklistEditFormActions';
import { withRouter, Redirect } from 'react-router-dom';

interface Props {
  formState: types.TasklistEditFormState;
  tasklist: types.TasklistState;
  history: any;
  closeForm(): any;
  changeTitle(title: string): any;
  destroyTasklist(id: number): any;
  submit(id: number, params: object): any;
  init(tasklist: types.TasklistState): any;
}

interface State {
  open: boolean;
}

/**
 * Tasklist 編集フォーム
 */
class TasklistEditFormContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({ open: true }));
    this.props.init(this.props.tasklist);
  }

  componentWillUnmount() {
    this.props.closeForm();
  }

  render() {
    const { formState, changeTitle, destroyTasklist, tasklist, history } = this.props;

    if (!tasklist) {
      return <Redirect to="/tasklists" />;
    }

    if (formState.isSubmitted) {
      return <Redirect to={`/tasklists/${tasklist.id}`} />;
    }

    return (
      <Transition
        animation="fade down"
        duration={180}
        visible={this.state.open}
        onHide={() => history.replace(`/tasklists/${tasklist.id}`)}
      >
        <Modal
          centered={false}
          closeOnEscape={!formState.isSubmitting}
          closeOnDimmerClick={!formState.isSubmitting}
          open={true}
          size="tiny"
          onClose={() => this.setState(() => ({ open: false }))}
        >
          <Modal.Header>リストを編集</Modal.Header>
          <Modal.Content>
            {formState.isSubmitting && (
              <Dimmer active>
                <Loader inline="centered">Loading</Loader>
              </Dimmer>
            )}

            <TasklistForm
              canDestroy={true}
              title={formState.title}
              onTitleChange={changeTitle}
              onSubmit={this.handleSubmit}
              onDestroyClick={() => {
                if (window.confirm('本当に削除しますか?')) {
                  destroyTasklist(formState.id);
                }
              }}
            />
          </Modal.Content>
        </Modal>
      </Transition>
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
  return {
    tasklist: getTasklist(state, ownProps),
    formState: state.tasklistEditForm
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeTitle: (title: string) => formActions.changeTitle(title),
      closeForm: () => formActions.close(),
      destroyTasklist: (id: number) => formActions.destroyTasklist(id),
      submit: (id: number, params: {}) => formActions.submit(id, params),
      init: (tasklist: types.TasklistState) => formActions.init(tasklist)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistEditFormContainer)
);
