import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Hero = styled.div`
  height: 480px;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Overlay = styled.div`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(33, 132, 208, 0.1);
  position: absolute;
  z-index: 2;
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Hero>
          <div>
            <Link to="/tasklists">
              <Button
                icon="google plus square"
                color="google plus"
                size="huge"
                content="Googleログイン"
              />
            </Link>
          </div>
        </Hero>
        <Container />
      </div>
    );
  }
}

export { Home };
