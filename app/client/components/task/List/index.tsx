import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';

interface ListProps {
  items: types.TaskState[];
}

class List extends React.Component<ListProps> {
  render() {
    const { items } = this.props;

    return (
      <Segment.Group>
        {items.map((item, i) => {
          return <Segment key={i}>{item.title}</Segment>;
        })}
      </Segment.Group>
    );
  }
}

export { List };
