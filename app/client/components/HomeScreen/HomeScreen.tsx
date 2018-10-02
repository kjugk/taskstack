import * as React from 'react';
import { Header } from './Header/Header';
import { HomeHero } from './HomeHero/HomeHero';
import { HomeFeature } from './HomeFeature/HomeFeature';
import { HomeFooter } from './HomeFooter/HomeFooter';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${(props) => `background: ${props.theme.lightGrey}`};
`;

const GradientScreen = styled.div`
  background: #2185d0;
  background-image: linear-gradient(to right bottom, #2185d0, #2f8fd8, #3c99e1, #48a3e9, #53adf1);
  margin-bottom: 100px;
`;

const HomeScreen: React.SFC = () => (
  <Wrapper>
    <GradientScreen>
      <Header />
      <HomeHero />
    </GradientScreen>
    <HomeFeature />
    <HomeFooter />
  </Wrapper>
);

export { HomeScreen };
