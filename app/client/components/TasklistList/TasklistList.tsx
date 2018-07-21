import * as React from 'react';
import * as types from '../../types';
import { TasklistListItem } from './TasklistListItem/TasklistListItem';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`;

interface ListProps {
  items: types.TasklistState[];
  selectingId: number;
  onItemClick(id: number): any;
  onEditButtonClick(tasklist: any): any;
}

class TasklistList extends React.Component<ListProps> {
  render() {
    const { items, onItemClick, onEditButtonClick, selectingId } = this.props;

    return (
      <Container>
        {items.map((item, i) => {
          return (
            <TasklistListItem
              onClick={onItemClick}
              onEditButtonClick={onEditButtonClick}
              item={item}
              isSelecting={item.id === selectingId}
              key={i}
            />
          );
        })}
      </Container>
    );
  }
}

export { TasklistList };
