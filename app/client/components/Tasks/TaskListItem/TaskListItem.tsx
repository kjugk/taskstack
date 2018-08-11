import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';

const ItemContainer = styled<{ completed: boolean }, any>('div')`
  cursor: pointer;
  display: block;
  padding: 1rem;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  :last-child {
    border-bottom: none;
  }
  ${(props) => props.completed && 'color: #ccc; background: #f5f5f5'};
`;

const TitleWrapper = styled<{ completed: boolean }, any>('span')`
  margin-left: 0.8rem;
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
      <ItemContainer
        completed={item.completed}
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          onItemClick(item.id);
        }}
      >
        <input
          type="checkbox"
          checked={item.completed}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onCheckChange(item.id, { completed: !item.completed });
          }}
        />
        <TitleWrapper completed={item.completed}>{item.title}</TitleWrapper>
      </ItemContainer>
    );
  }
}

export { TaskListItem };
