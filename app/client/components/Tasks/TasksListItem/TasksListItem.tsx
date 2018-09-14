import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';

const Container = styled<{ completed: boolean }, any>('div')`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0.6rem 1rem;
  ${(props) =>
    props.completed && `color: ${props.theme.darkGrey}; background: ${props.theme.lightGrey}`};
`;

const Title = styled<{ completed: boolean }, any>('span')`
  flex: 1;
  margin-left: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) => props.completed && 'text-decoration: line-through;'};
`;

interface Props {
  item: types.TaskState;
  onClickItem(id: number): any;
  onChangeCheck(id: number, params: any): any;
}

const TasksListItem: React.SFC<Props> = ({ item, onClickItem, onChangeCheck }) => (
  <Segment
    style={{
      alignItems: 'center',
      boxShadow: '0px 0px 1px 0px rbga(0,0,0,0.1)',
      margin: '0px 0px .5rem 0px',
      padding: 0
    }}
  >
    <Container
      completed={item.completed}
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        onClickItem(item.id);
      }}
    >
      <Checkbox
        fitted
        checked={item.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          onChangeCheck(item.id, { completed: !item.completed });
        }}
      />
      <Title completed={item.completed}>{item.title}</Title>
      {item.memo !== '' && <Icon size="small" name="thumbtack" color="grey" />}
    </Container>
  </Segment>
);

export { TasksListItem };
