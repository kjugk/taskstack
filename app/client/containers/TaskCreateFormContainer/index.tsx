import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import * as taskCreateFormActions from '../../actions/taskCreateFormActions';
import { getSelectedTaskList } from '../../reducers/tasklistList';
import { Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

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
            placeholder="タスクを作成"
            fluid
            disabled={formState.isSubmitting}
            icon={formState.isSubmitting && <Icon loading name="spinner" />}
            value={formState.title}
            onChange={(e) => changeTitle(e.currentTarget.value)}
          />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  return {
    tasklist: getSelectedTaskList(state.tasklistList),
    formState: state.taskCreateForm
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeTitle: (title: string) => dispatch(taskCreateFormActions.changeTitle(title)),
  submit: (tasklistId: number, params: any) =>
    dispatch(taskCreateFormActions.submit(tasklistId, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskCreateFormContainer);
