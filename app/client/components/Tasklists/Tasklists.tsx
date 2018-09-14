import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TasklistsListItem } from './TasklistsListItem/TasklistsListItem';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  flex: 1;
`;

interface Props {
  items: types.TasklistState[];
  selectingId: number;
  onClickItem(id: number): any;
  onClickEditButton(id: number): any;
}

const Tasklists: React.SFC<Props> = ({ items, onClickItem, onClickEditButton, selectingId }) => (
  <Container>
    {items.map((item, i) => (
      <TasklistsListItem
        onClickItem={onClickItem}
        onClickEditButton={onClickEditButton}
        item={item}
        isSelecting={item.id === selectingId}
        key={i}
      />
    ))}
  </Container>
);

export { Tasklists };
