import * as React from 'react';
import styled from 'styled-components';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import hero from '../../../assets/images/hero@2x.png';
import login from '../../../assets/images/google_login@2x.png';

const Hero = styled.div`
  color: #f5f5f5 !important;
  padding-top: 40px;
  position: relative;
  text-align: center;
  line-height: 0.8;
  background: transparent;
`;

const HeroHeader = styled.h1`
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.8rem;

  @media (max-width: 786px) {
    font-size: 1.4rem;
  }
`;

const HeroSubheader = styled.div`
  margin-bottom: 3rem;
  font-size: 1.2rem;

  @media (max-width: 786px) {
    font-size: 0.75rem;
  }
`;

const HomeHero: React.SFC = () => (
  <Container>
    <Hero>
      <HeroHeader>山積みの仕事を、 片付けたいなら</HeroHeader>
      <HeroSubheader>TaskStack は、シンプルで使いやすいタスク管理サービスです</HeroSubheader>

      <div>
        <a href="/login">
          <img src={login} style={{ width: '215px' }} />
        </a>
      </div>

      <div
        style={{
          position: 'relative',
          marginTop: '-60px',
          transform: 'translateY(100px)'
        }}
      >
        <img src={hero} style={{ width: '100%', maxWidth: '768px' }} />
      </div>
    </Hero>
  </Container>
);

export { HomeHero };
