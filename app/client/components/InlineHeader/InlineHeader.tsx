import * as React from 'react';
import * as types from '../../types';
import { Image, Icon, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import key from 'keymaster';

const Wrapper = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  flex-basis: 36px;
  margin-right: 1rem;
`;

const UserName = styled.div`
  flex: 1;
  font-weight: bold;
`;

interface Props {
  user: types.UserState;
  onSignOutClick(): any;
}

interface State {
  openMenu: boolean;
}

class InlineHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      openMenu: false
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!prevState.openMenu && this.state.openMenu) {
      key('esc', this.closeMenu);
      window.addEventListener('click', this.closeMenu);
    } else if (prevState.openMenu && !this.state.openMenu) {
      key.unbind('esc');
      window.removeEventListener('click', this.closeMenu);
    }
  }

  componentWillUnmount() {
    key.unbind('esc');
    window.removeEventListener('click', this.closeMenu);
  }

  render() {
    const { user, onSignOutClick } = this.props;

    return (
      <>
        <Wrapper
          onClick={(e) => {
            e.stopPropagation();
            this.setState((prevState) => ({
              openMenu: !prevState.openMenu
            }));
          }}
        >
          <Avatar>
            <Image src={user.imageUrl} avatar size="mini" />
          </Avatar>
          <UserName>{user.name}</UserName>
          <Icon name="chevron down" style={{ color: '#ccc' }} />
        </Wrapper>

        {this.state.openMenu && (
          <Menu vertical style={{ position: 'absolute', top: 40 }}>
            <Menu.Item name="signOut" onClick={onSignOutClick}>
              ログアウト
            </Menu.Item>
          </Menu>
        )}
      </>
    );
  }

  private closeMenu() {
    this.setState(() => ({
      openMenu: false
    }));
  }
}

export { InlineHeader };
