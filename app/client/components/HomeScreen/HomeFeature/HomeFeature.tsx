import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  padding: 2rem 0 4rem;
  flex: 1;
`;

const Card = styled.div`
  padding: 1rem;
  text-align: center;
`;

const CardIcon = styled.div`
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const HomeFeature: React.SFC = () => {
  return (
    <Wrapper>
      <Container>
        <Grid columns={3} stackable stretched>
          <Grid.Column>
            <Card>
              <CardIcon>
                <Icon
                  name="tasks"
                  size="big"
                  color="blue"
                  circular
                  style={{ boxShadow: 'none', background: '#EEF7FE' }}
                />
              </CardIcon>
              <CardHeader>シンプルな操作性</CardHeader>
              <div>シンプルで親しみやすい操作性で、すぐに使いこなすことができます。</div>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <CardIcon>
                <Icon
                  name="mobile alternate"
                  size="big"
                  color="blue"
                  circular
                  style={{ boxShadow: 'none', background: '#EEF7FE' }}
                />
              </CardIcon>
              <CardHeader>PCでもスマホでも</CardHeader>
              <div>TaskStackは、最新のPC・スマートフォンブラウザでご利用いただけます。</div>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <CardIcon>
                <Icon
                  name="cny"
                  size="big"
                  color="blue"
                  circular
                  style={{ boxShadow: 'none', background: '#EEF7FE' }}
                />
              </CardIcon>
              <CardHeader>無料</CardHeader>
              <div>TaskStackは、誰でも無料でご利用いただけます。</div>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export { HomeFeature };
