import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  background: #2184d0;
  color: #fff;
`;

const Brand = styled.span`
  font-weight: bold;
  font-size: 2rem;
  line-height: 1;
`;

class Header extends React.Component {
  render() {
    return (
      <Container>
        <Brand>HEADER</Brand>
      </Container>
    );
  }
}

export { Header };
