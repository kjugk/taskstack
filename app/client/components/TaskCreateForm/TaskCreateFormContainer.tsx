import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskCreateFormActions from '../../actions/taskCreateFormActions';
import { getTasklist } from '../../reducers/tasklists';
import { withRouter } from 'react-router-dom';
import { TaskCreateForm } from './TaskCreateForm';

interface TaskCreateFormContainerProps {
  formState: types.TaskCreateFormState;
  tasklist: types.TasklistState | undefined;
  changeTitle(title: string): any;
  submit(tasklistId: number, params: any): any;
}

class TaskCreateFormContainer extends React.Component<TaskCreateFormContainerProps> {
  constructor(props: TaskCreateFormContainerProps) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  render() {
    const { tasklist, formState, changeTitle } = this.props;
    if (!tasklist) return null;

    return (
      <TaskCreateForm
        formState={formState}
        onSubmit={this.handleOnSubmit}
        onTitleChange={(title) => changeTitle(title)}
      />
    );
  }

  private handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { formState, tasklist, submit } = this.props;

    if (!tasklist) return;
    if (formState.title.trim() === '') {
      return;
    }

    submit(tasklist.id, { title: formState.title });
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklist: getTasklist(state, ownProps),
    formState: state.taskCreateForm,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeTitle: (title: string) => taskCreateFormActions.setChangedTitle(title),
      submit: (tasklistId: number, params: any) => taskCreateFormActions.submit(tasklistId, params)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskCreateFormContainer)
);
