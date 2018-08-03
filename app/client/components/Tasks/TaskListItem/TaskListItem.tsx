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

interface TaskListItemProps {
  item: types.TaskState;
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
}

class TaskListItem extends React.Component<TaskListItemProps> {
  render() {
    const { item, onItemClick, onCheckChange } = this.props;

    return (
      <Segment>
        <ItemContainer
          completed={item.completed}
          onClick={(e: any) => {
            e.stopPropagation();
            onItemClick(item.id);
          }}
        >
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
  }
}

export { TaskListItem };
