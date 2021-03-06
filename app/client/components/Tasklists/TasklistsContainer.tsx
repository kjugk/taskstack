import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTasklists } from '../../reducers/tasklists';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import { Tasklists } from './Tasklists';
import { TasklistCreateButton } from './TasklistCreateButton/TasklistCreateButton';
import * as tasklistActions from '../../actions/tasklistActions';
import { withRouter } from 'react-router-dom';
import * as sidebarActions from '../../actions/sidebarActions';
import { getTasklist } from '../../reducers/tasklists';

interface Props {
  tasklist: types.TasklistState;
  tasklistsState: types.TasklistsState;
  tasklists: types.TasklistState[];
  match: any;
  history: any;
  closeMenu(): any;
  fetchTasklists(): any;
  editTasklist(tasklist: any): any;
  sortTasklist(ids: number[]): any;
}

/**
 * タスクリスト一覧
 */
class TasklistsContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOnClickCreateButton = this.handleOnClickCreateButton.bind(this);
  }

  componentDidMount() {
    const { tasklistsState, fetchTasklists } = this.props;

    if (!tasklistsState.isInitialized) {
      fetchTasklists();
    }
  }

  render() {
    const { tasklistsState, tasklists, sortTasklist, match, history } = this.props;
    const selectingId = parseInt(match.params.tasklistId, 10);

    if (tasklistsState.isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <>
        <Tasklists
          selectingId={selectingId}
          onClickItem={(id: number) => {
            this.props.closeMenu();
            this.props.history.push(`/tasklists/${id}`);
          }}
          onClickEditButton={(id: number) => history.push(`/tasklists/${id}/edit`)}
          onSort={(ids: number[]) => sortTasklist(ids)}
          items={tasklists}
        />
        <TasklistCreateButton onClick={this.handleOnClickCreateButton} />
      </>
    );
  }

  private handleOnClickCreateButton() {
    const { tasklist, history } = this.props;

    if (tasklist) {
      history.push(`/tasklists/${tasklist.id}/with/new`);
    } else {
      history.push('/tasklists/new');
    }
  }
}

const mapStateToProps = (state: types.RootState, ownProps: any) => {
  return {
    tasklist: getTasklist(state, ownProps),
    tasklistsState: state.tasklists,
    tasklists: getTasklists(state),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTasklists: () => tasklistActions.fetchTasklists(),
      editTasklist: (tasklist: any) => tasklistActions.edit(tasklist),
      closeMenu: () => sidebarActions.close(),
      sortTasklist: (ids: number[]) => tasklistActions.sortTasklist(ids)
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasklistsContainer)
);
