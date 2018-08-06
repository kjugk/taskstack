import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import * as taskCreateFormActions from '../../actions/taskCreateFormActions';
import { getTasklist } from '../../reducers/tasklists';
import { Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

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
  private input: any;

  componentDidUpdate(prevProps: TaskCreateFormContainerProps) {
    const { formState } = this.props;

    if (prevProps.formState.isSubmitting && !formState.isSubmitting) {
      this.input.focus();
    }
  }

  render() {
    const { tasklist, formState, changeTitle, submit } = this.props;

    if (!tasklist) return null;

    return (
      <Container>
        <h2>{tasklist.title}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formState.title.trim() === '') return;

            submit(tasklist.id, { title: formState.title });
          }}
        >
          <Input
            disabled={formState.isSubmitting}
            fluid
            icon={formState.isSubmitting && <Icon loading name="spinner" />}
            onChange={(e: any) => changeTitle(e.currentTarget.value)}
            placeholder="タスクを作成"
            value={formState.title}
            ref={(ref) => (this.input = ref)}
          />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  const tasklistId = parseInt(ownProps.match.params.tasklistId, 10);

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
