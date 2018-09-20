import * as React from 'react';
import png from '../../assets/images/logo.png';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => `background: ${props.theme.grey}`};
`;

export const Loading: React.SFC = () => (
  <Container>
    <img src={png} style={{ width: '120px' }} />
  </Container>
);
