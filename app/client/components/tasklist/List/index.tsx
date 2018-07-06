import * as React from 'react';
import * as types from '../../../types';
import { ListItem } from '../ListItem';
import styled from 'styled-components';

interface ListProps {
  items: types.TasklistState[];
}

const Container = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`;

class List extends React.Component<ListProps> {
  render() {
    return (
      <Container>
        {this.props.items.map((item, i) => {
          return <ListItem item={item} key={i} />;
        })}
      </Container>
    );
  }
}

export { List };
