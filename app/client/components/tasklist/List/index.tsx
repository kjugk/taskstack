import * as React from 'react';
import * as types from '../../../types';
import { ListItem } from '../ListItem';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`;

interface ListProps {
  items: types.TasklistState[];
  selectingId: number;
  onItemClick(id: number): any;
  onEditButtonClick(tasklist: any): any;
}

class List extends React.Component<ListProps> {
  render() {
    const { items, onItemClick, onEditButtonClick, selectingId } = this.props;

    return (
      <Container>
        {items.map((item, i) => {
          return (
            <ListItem
              onClick={onItemClick}
              onEditButtonClick={onEditButtonClick}
              item={item}
              isSelecting={item.id === selectingId}
              key={i}
            />
          );
        })}
      </Container>
    );
  }
}

export { List };
