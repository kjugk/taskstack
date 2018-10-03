import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { HeaderUser } from './HeaderUser';
import { Brand } from '../Brand/Brand';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0.7rem 1rem;
  ${(props) => `
    color: ${props.theme.white};
    background: ${props.theme.main};
  `};
`;

const TasklistTitle = styled.div`
  flex: 1;
  margin-right: 0.5rem;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  tasklist: types.TasklistState | undefined;
  user: types.UserState;
  onClickBars(): any;
  onClickSignOut(): any;
}

const Header: React.SFC<Props> = ({ tasklist, user, onClickBars, onClickSignOut }) => (
  <Container>
    <div style={{ lineHeight: 1 }}>
      <Responsive minWidth={768} as={() => <Brand />} />
      <Responsive
        maxWidth={767}
        as={() => <Icon name="bars" size="large" onClick={onClickBars} />}
      />
    </div>
    <TasklistTitle>
      {tasklist && <Responsive maxWidth={767} as={() => <span>{tasklist.title}</span>} />}
    </TasklistTitle>
    <HeaderUser user={user} onClickSignOut={onClickSignOut} />
  </Container>
);

export { Header };
