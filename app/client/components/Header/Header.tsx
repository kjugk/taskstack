import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

const Brand = styled.span`
  font-weight: bold;
  font-size: 2rem;
  line-height: 1;
  color: #fff;
`;

class Header extends React.Component {
  render() {
    return (
      <Container style={{ padding: '1.4rem 0' }}>
        <Brand>TaskStack</Brand>
      </Container>
    );
  }
}

export { Header };
