import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTasklist } from '../../reducers/tasklists';
import * as formActions from '../../actions/tasklistEditFormActions';
import { withRouter, Redirect } from 'react-router-dom';
import { TasklistEditForm } from './TasklistEditForm';

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

/**
 * Tasklist 編集フォーム
 */
class TasklistEditFormContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
      <TasklistEditForm
        formState={formState}
        tasklist={tasklist}
        onChangeTitle={changeTitle}
        onDestroyTasklist={destroyTasklist}
        onSubmit={this.handleSubmit}
        onClose={() => {
          history.replace(`/tasklists/${tasklist.id}`);
        }}
      />
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
