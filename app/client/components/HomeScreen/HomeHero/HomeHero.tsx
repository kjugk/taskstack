import * as React from 'react';
import styled from 'styled-components';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import png from '../../../assets/images/samlpe@3x-min.png';

const Hero = styled.div`
  color: #f5f5f5 !important;
  padding-top: 100px;
  padding-bottom: 160px;
  position: relative;
`;

const HeroHeader = styled.h1`
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
          <HeroHeader>山積みの仕事を、 片付けたいなら</HeroHeader>
          <HeroSubheader>TaskStack は、シンプルで使いやすいタスク管理サービスです。</HeroSubheader>
          <div>
            <a href="/login">
              <Button icon="google" color="google plus" size="huge" content="Google ログイン" />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={7}>
          <img src={png} style={{ width: '100%' }} alt="hero_image" />
        </Grid.Column>
      </Grid>
    </Hero>
  </Container>
);

export { HomeHero };
