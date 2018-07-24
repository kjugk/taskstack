import * as React from 'react';
import * as types from '../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from './TaskListItem/TaskListItem';

interface ListProps {
  items: types.TaskState[];
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
}

class TaskList extends React.Component<ListProps> {
  render() {
    const { items, ...rest } = this.props;

    if (items.length <= 0) return null;

    return (
      <Segment.Group>
        {items.map((item, i) => {
          return <TaskListItem key={i} item={item} {...rest} />;
        })}
      </Segment.Group>
    );
  }
}

export { TaskList };
