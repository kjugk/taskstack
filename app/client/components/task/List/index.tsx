import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const ItemContainer = styled<{ completed: boolean }, any>(Segment)`
  cursor: pointer;
  ${(props) => props.completed && 'background: #eee!important; color: #ccc;'};
`;

const TitleWrapper = styled<{ completed: boolean }, any>('span')`
  margin-left: 0.5rem;
  ${(props) => props.completed && 'text-decoration: line-through;'};
`;

interface ListProps {
  items: types.TaskState[];
  onCheckChange(id: number, params: any): any;
}

class List extends React.Component<ListProps> {
  render() {
    const { items, onCheckChange } = this.props;

    if (items.length <= 0) return null;

    return (
      <Segment.Group>
        {items.map((item, i) => {
          if (item === undefined) return null;

          return (
            <ItemContainer completed={item.completed} key={i}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  onCheckChange(item.id, { completed: !item.completed });
                }}
              />
              <TitleWrapper completed={item.completed}>{item.title}</TitleWrapper>
            </ItemContainer>
          );
        })}
      </Segment.Group>
    );
  }
}

export { List };
