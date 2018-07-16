import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';

interface ListProps {
  items: types.TaskState[];
  onCheckChange(id: number, params: any): any;
}

class List extends React.Component<ListProps> {
  render() {
    const { items, onCheckChange } = this.props;

    return (
      <Segment.Group>
        {items.map((item, i) => {
          if (item === undefined) return null;

          return (
            <Segment key={i}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  onCheckChange(item.id, { completed: !item.completed });
                }}
              />
              {item.title}
            </Segment>
          );
        })}
      </Segment.Group>
    );
  }
}

export { List };
