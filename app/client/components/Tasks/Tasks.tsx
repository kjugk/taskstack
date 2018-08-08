import * as React from 'react';
import * as types from '../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from './TaskListItem/TaskListItem';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

interface TasksProps {
  tasklist: types.TasklistState;
  items: types.TaskState[];
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
  onSort(tasklistId: number, taskIds: number[]): any;
}

const SortableItem = SortableElement((props: any) => {
  const { value, ...rest } = props;

  return <TaskListItem item={value} {...rest} />;
});

const SortableList = SortableContainer((props: any) => {
  const { items, ...rest } = props;

  return (
    <Segment.Group style={{ marginBottom: '3rem' }}>
      {props.items.map((item: any, i: number) => {
        return <SortableItem key={i} index={i} value={item} {...rest} />;
      })}
    </Segment.Group>
  );
});

class Tasks extends React.Component<TasksProps> {
  render() {
    const { items, ...rest } = this.props;

    if (items.length <= 0) return null;

    return (
      <SortableList
        distance={5}
        items={items}
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

export { Tasks };
