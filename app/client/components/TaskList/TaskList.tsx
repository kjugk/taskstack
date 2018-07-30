import * as React from 'react';
import * as types from '../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from './TaskListItem/TaskListItem';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

interface ListProps {
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
    <Segment.Group>
      {props.items.map((item: any, i: number) => {
        return <SortableItem key={i} index={i} value={item} {...rest} />;
      })}
    </Segment.Group>
  );
});

class TaskList extends React.Component<ListProps> {
  render() {
    const { items, ...rest } = this.props;

    if (items.length <= 0) return null;

    return (
      <SortableList
        distance={10}
        items={items}
        onSortEnd={(props: any) => this.handleSortEnd(props.oldIndex, props.newIndex)}
        {...rest}
      />
    );
  }

  private handleSortEnd(oldIndex: number, newIndex: number) {
    const taskIds = arrayMove(this.props.items, oldIndex, newIndex).map((item) => item.id);
    this.props.onSort(this.props.tasklist.id, taskIds);
  }
}

export { TaskList };
