import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import { Container, Button } from 'semantic-ui-react';
import * as types from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Hero = styled.div`
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

interface HomeProps {
  user: types.UserState;
}

class HomeContainer extends React.Component<HomeProps> {
  render() {
    const { user } = this.props;

    if (user.signedIn) {
      return <Redirect to="/tasklists" />;
    }

    return (
      <div>
        <Header />
        <Hero>
          <div>
            <a href="/login">
              <Button
                icon="google plus square"
                color="google plus"
                size="huge"
                content="Googleログイン"
              />
            </a>
          </div>
        </Hero>
        <Container />
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

export default connect(mapStateToProps)(HomeContainer);
