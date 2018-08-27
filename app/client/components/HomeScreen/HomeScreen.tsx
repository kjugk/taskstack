import * as React from 'react';
import { Header } from '../Header/Header';
import { HomeHero } from './HomeHero/HomeHero';
import { HomeFeature } from './HomeFeature/HomeFeature';
import { HomeFooter } from './HomeFooter/HomeFooter';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'M PLUS 1p', sans-serif !important;
`;

const Upper = styled.div`
  background: #2185d0;
  background-image: linear-gradient(149deg, rgba(33, 133, 208, 1) 0%, rgba(63, 199, 204, 1) 100%);
`;

const HomeScreen: React.SFC = () => (
  <Wrapper>
    <Upper>
      <Header />
      <HomeHero />
    </Upper>
    <HomeFeature />
    <HomeFooter />
  </Wrapper>
);

export { HomeScreen };
