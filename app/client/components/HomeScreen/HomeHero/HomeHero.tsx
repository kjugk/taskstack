import * as React from 'react';
import styled from 'styled-components';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import hero from '../../../assets/images/hero@2x.png';
import login from '../../../assets/images/google_login@2x.png';

const Hero = styled.div`
  padding-top: 60px;
  position: relative;
  text-align: center;
  background: transparent;
  ${(props) => `color: ${props.theme.white}`};
`;

const HeroHeader = styled.h1`
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.8rem;

  @media (max-width: 786px) {
    font-size: 2rem;
  }
`;

const HeroSubheader = styled.div`
  margin-bottom: 2.8rem;
  font-size: 1.2rem;

  @media (max-width: 786px) {
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.a`
  outline: none;
  @media (min-width: 787px) {
    img {
      transition: transform 0.2s;
    }
    &:hover,
    &:focus,
    &:active {
      img {
        transform: scale(1.1, 1.1);
      }
    }
  }
`;

const HomeHero: React.SFC = () => (
  <Container>
    <Hero>
      <HeroHeader>山積みの仕事を、片付けたいなら</HeroHeader>
      <HeroSubheader>TaskStack は、シンプルで使いやすいタスク管理サービスです</HeroSubheader>

      <div>
        <ButtonWrapper href="/login" rel="nofollow">
          <img src={login} style={{ width: '215px' }} />
        </ButtonWrapper>
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
