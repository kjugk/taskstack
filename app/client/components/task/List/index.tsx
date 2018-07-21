import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const ItemContainer = styled<{ completed: boolean }, any>('div')`
  cursor: pointer;
  ${(props) => props.completed && 'color: #ccc;'};
`;

const TitleWrapper = styled<{ completed: boolean }, any>('span')`
  margin-left: 0.5rem;
  ${(props) => props.completed && 'text-decoration: line-through;'};
`;

interface ListProps {
  items: types.TaskState[];
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
}

class List extends React.Component<ListProps> {
  render() {
    const { items, onCheckChange, onItemClick } = this.props;

    if (items.length <= 0) return null;

    return (
      <Segment.Group>
        {items.map((item, i) => {
          if (item === undefined) return null;

          return (
            <Segment key={i}>
              <ItemContainer completed={item.completed} onClick={() => onItemClick(item.id)}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    onCheckChange(item.id, { completed: !item.completed });
                  }}
                />
                <TitleWrapper completed={item.completed}>{item.title}</TitleWrapper>
              </ItemContainer>
            </Segment>
          );
        })}
      </Segment.Group>
    );
  }
}

export { List };
