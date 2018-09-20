import * as React from 'react';
import styled from 'styled-components';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import png from '../../../assets/images/top@2x.png';

const Hero = styled.div`
  color: #f5f5f5 !important;
  padding-top: 40px;
  position: relative;
  text-align: center;
  line-height: 0.8;
`;

const HeroHeader = styled.h1`
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.5;
  font-size: 2.8rem;

  @media (max-width: 786px) {
    font-size: 1.4rem;
  }
`;

const HeroSubheader = styled.div`
  line-height: 1.5;
  margin-bottom: 1.6rem;
  font-size: 1.2rem;

  @media (max-width: 786px) {
    font-size: 0.6rem;
  }
`;

const HomeHero: React.SFC = () => (
  <Container>
    <Hero>
      <HeroHeader>山積みの仕事を、 片付けたいなら</HeroHeader>
      <HeroSubheader>TaskStack は、シンプルで使いやすいタスク管理サービスです</HeroSubheader>

      <div style={{ marginBottom: '40px' }}>
        <a href="/login">
          <Button
            icon="google"
            style={{ background: '#fff' }}
            size="large"
            content="Google ログイン"
          />
        </a>
      </div>

      <img src={png} style={{ width: '100%', maxWidth: '768px' }} />
    </Hero>
  </Container>
);

export { HomeHero };
