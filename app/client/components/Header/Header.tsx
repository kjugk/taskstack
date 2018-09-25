import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { HeaderUser } from './HeaderUser';
import Logo from '../../assets/images/logo.png';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  ${(props) => `
    color: ${props.theme.white};
    background: ${props.theme.main};
  `};
`;

const Brand = styled.div`
  line-height: 1;
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
      <Responsive minWidth={768} as={() => <img src={Logo} style={{ width: '120px' }} />} />
      <Responsive
        maxWidth={767}
        as={() => (
          <Brand>
            <Icon name="bars" size="large" onClick={onClickBars} />
          </Brand>
        )}
      />
    </div>
    <TasklistTitle>
      {tasklist && <Responsive maxWidth={767} as={() => <span>{tasklist.title}</span>} />}
    </TasklistTitle>
    <HeaderUser user={user} onClickSignOut={onClickSignOut} />
  </Container>
);

export { Header };
