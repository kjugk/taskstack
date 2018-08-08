import * as React from 'react';
import DashboardContainer from '../Dashboard/DashboardContainer';
import MessageContainer from '../Message/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from '../Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <div style={{ flex: 1 }}>
            <Route exact path="/" component={DashboardContainer} />
            <Route path="/tasklists/:tasklistId" component={DashboardContainer} />
          </div>
          <MessageContainer />
        </Container>
      </Router>
    );
  }
}

export { AppContainer };
