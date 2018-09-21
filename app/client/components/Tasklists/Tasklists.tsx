import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import { TasklistsListItem } from './TasklistsListItem/TasklistsListItem';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

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
  onSort(ids: number[]): any;
}

const SortableItem = SortableElement((props: any) => {
  const { value, ...rest } = props;

  return <TasklistsListItem item={value} {...rest} />;
});

const SortableList = SortableContainer((props: any) => {
  const { items, ...rest } = props;

  return (
    <Container>
      {items.map((item: any, i: number) => (
        <SortableItem key={item.id} index={i} value={item} {...rest} />
      ))}
    </Container>
  );
});

class Tasklists extends React.Component<Props> {
  render() {
    const { items, ...rest } = this.props;

    return (
      <SortableList
        items={items}
        pressDelay={200}
        onSortEnd={(props: any) => this.handleSortEnd(props.oldIndex, props.newIndex)}
        {...rest}
      />
    );
  }

  private handleSortEnd(oldIndex: number, newIndex: number) {
    if (oldIndex === newIndex) return;

    const newIds = arrayMove(this.props.items, oldIndex, newIndex).map((item) => item.id);
    this.props.onSort(newIds);
  }
}

export { Tasklists };
