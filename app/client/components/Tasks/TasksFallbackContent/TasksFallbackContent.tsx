import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/main@2x.png';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainImage = styled(Image)`
  width: 430px;
  margin-bottom: 1rem;
`;

const TasksFallbackContent: React.SFC = () => (
  <Container>
    <MainImage src={img} />

    <div style={{ marginBottom: '1.5rem' }}>
      <div>最初のリストを作成しましょう</div>
    </div>

    <Link to="/tasklists/new">
      <Button primary icon="plus" content="リストを作成する" size="big" />
    </Link>
  </Container>
);

export { TasksFallbackContent };
