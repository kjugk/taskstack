import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import * as taskCreateFormActions from '../../actions/taskCreateFormActions';
import { getTasklist } from '../../reducers/tasklists';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { TaskCreateForm } from './TaskCreateForm';

const Container = styled.div`
  margin-bottom: 1rem;
`;

interface TaskCreateFormContainerProps {
  formState: types.TaskCreateFormState;
  tasklist: types.TasklistState | undefined;
  changeTitle(title: string): any;
  submit(tasklistId: number, params: any): any;
}

class TaskCreateFormContainer extends React.Component<TaskCreateFormContainerProps> {
  constructor(props: TaskCreateFormContainerProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { tasklist, formState, changeTitle } = this.props;
    if (!tasklist) return null;

    return (
      <Container>
        <TaskCreateForm
          formState={formState}
          onSubmit={this.handleSubmit}
          onTitleChange={(e) => changeTitle(e.currentTarget.value)}
        />
      </Container>
    );
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(taskCreateFormActions.changeTitle(title)),
  submit: (tasklistId: number, params: any) =>
    dispatch(taskCreateFormActions.submit(tasklistId, params))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskCreateFormContainer)
);
