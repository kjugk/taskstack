import * as React from 'react';
import * as types from '../../types';
import * as formActions from '../../actions/tasklistCreateFormActions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { TasklistCreateForm } from './TasklistCreateForm';

interface Props {
  formState: types.TasklistCreateFormState;
  history: any;
  changeTitle(title: string): any;
  close(): any;
  submit(params: object): any;
}

/**
 * Tasklist 作成フォーム
 */
class TasklistCreateFormContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const { formState, changeTitle, history } = this.props;

    if (formState.isSubmitted) return <Redirect to="/tasklists" />;

    return (
      <TasklistCreateForm
        formState={formState}
        onChangeTitle={changeTitle}
        onSubmit={this.handleSubmit}
        onClose={() => history.goBack()}
      />
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
      close: () => formActions.close(),
      submit: (params: {}) => formActions.submit(params)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistCreateFormContainer)
);
