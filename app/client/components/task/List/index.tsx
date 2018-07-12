import * as React from 'react';
import * as types from '../../../types';
import styled from 'styled-components';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`;

interface ListProps {
  items: types.TaskState[];
}

class List extends React.Component<ListProps> {
  render() {
    const { items } = this.props;

    return (
      <Container>
        {items.map((item, i) => {
          return <li key={i}>{item.title}</li>;
        })}
      </Container>
    );
  }
}

export { List };
