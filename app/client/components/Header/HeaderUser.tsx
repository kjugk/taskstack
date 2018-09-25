import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import { HeaderUserMenu } from './HeaderUserMenu';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import noavatar from '../../assets/images/noavatar.png';

const Content = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
`;

const UserName = styled.div`
  font-size: 0.8rem;
  flex: 1;
  margin-left: 0.5rem;
`;

const Chevron = styled<{ open: boolean }, any>(Icon)`
  margin-left: 0.5rem !important;
`;

interface Props {
  user: types.UserState;
  onClickSignOut(): any;
}

interface State {
  openMenu: boolean;
  avatarSrc: any;
}

class HeaderUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.closeMenu = this.closeMenu.bind(this);
    this.handleOnLoadAvatarError = this.handleOnLoadAvatarError.bind(this);
    this.state = {
      openMenu: false,
      avatarSrc: noavatar
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.closeMenu);
    this.setState(() => ({
      avatarSrc: this.props.user.imageUrl
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  render() {
    const { user, onClickSignOut } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <Content
          onClick={(e) => {
            e.stopPropagation();
            this.setState((prevState) => ({
              openMenu: !prevState.openMenu
            }));
          }}
        >
          <Avatar src={this.state.avatarSrc} onError={this.handleOnLoadAvatarError} />
          <Responsive
            minWidth={768}
            as={() => (
              <>
                <UserName>{user.name}</UserName>
                <Chevron name="chevron down" size="tiny" />
              </>
            )}
          />
        </Content>
        <HeaderUserMenu open={this.state.openMenu} onSignOutClick={onClickSignOut} />
      </div>
    );
  }

  private closeMenu() {
    this.setState(() => ({
      openMenu: false
    }));
  }

  private handleOnLoadAvatarError() {
    this.setState(() => ({
      avatarSrc: noavatar
    }));
  }
}

export { HeaderUser };
