import * as React from 'react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { getTaskLists } from '../../reducers/tasklistList';
import { Loader, Segment, Button, Icon } from 'semantic-ui-react';
import { List } from '../../components/tasklist/List';
import styled from 'styled-components';

interface TasklistListContainerProps {
  isFetching: boolean;
  isInitialized: boolean;
  tasklists: types.TasklistState[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ButtonContainer = styled.div`
  padding: 0.6rem;
`;

class TasklistListContainer extends React.Component<TasklistListContainerProps> {
  componentDidMount() {
    const { isInitialized } = this.props;

    if (isInitialized) {
      return;
    }
  }

  render() {
    const { tasklists, isFetching } = this.props;

    if (isFetching) {
      return <Loader active>Loading</Loader>;
    }

    return (
      <Container>
        <List items={tasklists} />
        <ButtonContainer>
          <Button fluid primary icon onClick={() => alert('Hoge')}>
            <Icon name="plus" /> リストを作成
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  const { isFetching, isInitialized } = state.tasklistList;

  return {
    isFetching,
    isInitialized,
    tasklists: getTaskLists(state.tasklistList)
  };
};

export default connect(mapStateToProps)(TasklistListContainer);
