import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import key from 'keymaster';
import { Image, Icon } from 'semantic-ui-react';
import { InlineHeaderUserMenu } from './InlineHeaderUserMenu/InlineHeaderUserMenu';

const Wrapper = styled.div`
  cursor: pointer;
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

const Chevron = styled<{ open: boolean }, any>(Icon)`
  transform: rotate(0);
  transition: transform 0.2s ease;
  ${(props) => props.open && 'transform: rotate(-180deg)'};
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

  componentDidMount() {
    key('esc', this.closeMenu);
    window.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    key.unbind('esc');
    window.removeEventListener('click', this.closeMenu);
  }

  render() {
    const { user, onSignOutClick } = this.props;

    return (
      <div>
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
          <Chevron name="chevron down" color="grey" open={this.state.openMenu} />
        </Wrapper>

        <InlineHeaderUserMenu open={this.state.openMenu} onSignOutClick={onSignOutClick} />
      </div>
    );
  }

  private closeMenu() {
    this.setState(() => ({
      openMenu: false
    }));
  }
}

export { InlineHeader };
