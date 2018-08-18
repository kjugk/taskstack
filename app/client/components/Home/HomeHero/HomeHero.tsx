import * as React from 'react';
import styled from 'styled-components';
import { Container, Button, Grid } from 'semantic-ui-react';

const Hero = styled.div`
  color: #f5f5f5 !important;
  padding-top: 100px;
  padding-bottom: 160px;
  position: relative;
`;

const HeroHeader = styled.h1`
  font-family: 'M PLUS 1p', sans-serif !important;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const HeroSubheader = styled.div`
  font-size: 1rem;
  margin-bottom: 1.6rem;
`;

const HomeHero: React.SFC = () => (
  <Container>
    <Hero>
      <Grid stackable>
        <Grid.Column
          width={9}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <HeroHeader>山積みの仕事を、 終わらせましょう</HeroHeader>
          <HeroSubheader>TaskStack は、シンプルで使いやすいタスク管理サービスです。</HeroSubheader>
          <div>
            <a href="/login">
              <Button icon="google" color="google plus" size="huge" content="Google ログイン" />
            </a>
            <a href="/login">
              <Button icon="facebook" color="facebook" size="huge" content="facebook ログイン" />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={7}>
          <img src="/images/samlpe@3x-min.png" style={{ width: '100%' }} />
        </Grid.Column>
      </Grid>
    </Hero>
  </Container>
);

export { HomeHero };
