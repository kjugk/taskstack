import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${(props) => `background: ${props.theme.grey}`};
`;

const HomeFooter: React.SFC = () => {
  return (
    <Wrapper>
      <Container style={{ display: 'flex', padding: '2rem 0' }}>
        <div style={{ flex: 1, fontWeight: 800 }}>&#9400; 2018 TaskStack</div>
        <div>about privacy terms</div>
      </Container>
    </Wrapper>
  );
};

export { HomeFooter };
