import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';

const ItemContainer = styled<{ completed: boolean }, any>('div')`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0.6rem 1rem;
  ${(props) => props.completed && 'color: #ccc; background: #f5f5f5'};
`;

const TitleWrapper = styled<{ completed: boolean }, any>('span')`
  flex: 1;
  margin-left: 0.8rem;
  ${(props) => props.completed && 'text-decoration: line-through;'};
`;

interface TaskListItemProps {
  item: types.TaskState;
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
}

class TasksListItem extends React.Component<TaskListItemProps> {
  render() {
    const { item, onItemClick, onCheckChange } = this.props;

    return (
      <Segment
        style={{
          alignItems: 'center',
          margin: '0px 0px .5rem 0px',
          padding: 0,
          boxShadow: '0px 0px 1px 0px rbga(0,0,0,0.1)'
        }}
      >
        <ItemContainer
          completed={item.completed}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            onItemClick(item.id);
          }}
        >
          <Checkbox
            fitted
            checked={item.completed}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onCheckChange(item.id, { completed: !item.completed });
            }}
          />
          <TitleWrapper completed={item.completed}>{item.title}</TitleWrapper>
          {item.memo !== '' && <Icon size="small" name="thumbtack" color="grey" />}
        </ItemContainer>
      </Segment>
    );
  }
}

export { TasksListItem };
