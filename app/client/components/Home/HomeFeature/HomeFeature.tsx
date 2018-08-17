import * as React from 'react';
import { Container, Header, Icon, Card, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #eee;
  flex: 1;
`;

const FeatureCard = styled(Card)`
  transform: translateY(-50px);
  width: 100% !important;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3) !important;
`;

const HomeFeature: React.SFC = () => {
  return (
    <Wrapper>
      <Container>
        <Grid columns={3} stackable stretched>
          <Grid.Column>
            <FeatureCard>
              <Card.Content>
                <Card.Header>
                  <Header as="h2" icon textAlign="center">
                    <Icon name="tasks" circular />
                    <Header.Content>シンプルな操作性</Header.Content>
                  </Header>
                </Card.Header>
                <Card.Description>
                  こんな素晴らしいことができます、的な。alk dlkjelkjasdf lkjasdfielkj aslkjasdoilkj
                  asdflkj
                </Card.Description>
              </Card.Content>
            </FeatureCard>
          </Grid.Column>

          <Grid.Column>
            <FeatureCard>
              <Card.Content>
                <Card.Header>
                  <Header as="h2" icon textAlign="center">
                    <Icon name="mobile alternate" circular />
                    <Header.Content>スマホ対応</Header.Content>
                  </Header>
                </Card.Header>
                <Card.Description>こんな素晴らしいことができます、的な。</Card.Description>
              </Card.Content>
            </FeatureCard>
          </Grid.Column>

          <Grid.Column>
            <FeatureCard>
              <Card.Content>
                <Card.Header>
                  <Header as="h2" icon textAlign="center">
                    <Icon name="cny" circular />
                    <Header.Content>無料</Header.Content>
                  </Header>
                </Card.Header>
                <Card.Description>こんな素晴らしいことができます、的な。</Card.Description>
              </Card.Content>
            </FeatureCard>
          </Grid.Column>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export { HomeFeature };
