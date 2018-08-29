import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #eee;
  flex: 1;
`;

const FeatureCard = styled(Card)`
  transform: translateY(-60px);
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
                  シンプルで親しみやすい操作性で、すぐに使いこなすことができます。
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
                    <Header.Content>PCでもスマホでも</Header.Content>
                  </Header>
                </Card.Header>
                <Card.Description>
                  TaskStackは、最新のPC・スマートフォンブラウザでご利用いただけます。
                </Card.Description>
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
                <Card.Description>TaskStackは、誰でも無料でご利用いただけます。</Card.Description>
              </Card.Content>
            </FeatureCard>
          </Grid.Column>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export { HomeFeature };
