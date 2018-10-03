import * as React from 'react';
import logo from '../../assets/images/logo_blue_500.png';
import styled from 'styled-components';

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
    <img src={logo} style={{ width: '200px', marginTop: '-40px' }} />
  </Container>
);
