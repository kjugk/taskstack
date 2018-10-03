import * as React from 'react';
import styled from 'styled-components';
import { Brand } from '../Brand/Brand';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${(props) => `background: ${props.theme.grey}`};
`;

export const Splash: React.SFC = () => (
  <Container>
    <Brand inverse style={{ width: '160px', marginTop: '-40px' }} />
  </Container>
);
