import * as React from 'react';
import * as types from '../../../types';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 2rem;
  box-shadow: none;
`;

interface TasksProps {
  items: types.TaskState[];
  tasklist: types.TasklistState;
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
  onSort(tasklistId: number, taskIds: number[]): any;
}

const SortableItem = SortableElement((props: any) => {
  const { value, ...rest } = props;

  return <TasksListItem item={value} {...rest} />;
});

const SortableList = SortableContainer((props: any) => {
  const { items, ...rest } = props;

  return (
    <Container>
      {props.items.map((item: any, i: number) => (
        <SortableItem key={i} index={i} value={item} {...rest} />
      ))}
    </Container>
  );
});

class ActiveTasks extends React.Component<TasksProps> {
  render() {
    const { items, ...rest } = this.props;
    if (items.length <= 0) return null;

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

    const newTaskIds = arrayMove(this.props.items, oldIndex, newIndex).map((item) => item.id);
    this.props.onSort(this.props.tasklist.id, newTaskIds);
  }
}

export { ActiveTasks };
