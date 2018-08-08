import * as React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  flex-basis: 36px;
  margin-right: 1rem;
`;

const InlineHeader: React.SFC = () => (
  <Wrapper>
    <Avatar>
      <Image src="/images/sample-avatar.png" avatar size="mini" />
    </Avatar>
    <span style={{ fontWeight: 'bold' }}>Koji Uegaki</span>
  </Wrapper>
);

export { InlineHeader };
