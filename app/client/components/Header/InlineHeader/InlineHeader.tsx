import * as React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import * as types from '../../../types';

const Wrapper = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  flex-basis: 36px;
  margin-right: 1rem;
`;

interface Props {
  user: types.UserState;
}

const InlineHeader: React.SFC<Props> = (props) => {
  const { user } = props;

  return (
    <Wrapper>
      <Avatar>
        <Image src={user.imageUrl} avatar size="mini" />
      </Avatar>
      <span style={{ fontWeight: 'bold' }}>{user.name}</span>
    </Wrapper>
  );
};

export { InlineHeader };
