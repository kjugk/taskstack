import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/main@2x.png';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const MainImage = styled(Image)`
  max-width: 100% !important;
  margin-bottom: 1rem;
  width: 430px;
`;

const TasksFallbackContent: React.SFC = () => (
  <Container>
    <MainImage src={img} />

    <div style={{ marginBottom: '1.5rem' }}>
      <div>最初のリストを作成しましょう (例 : 今日やること、買い物) </div>
    </div>

    <Link to="/tasklists/new">
      <Button primary icon="plus" content="リストを作成する" size="big" />
    </Link>
  </Container>
);

export { TasksFallbackContent };
