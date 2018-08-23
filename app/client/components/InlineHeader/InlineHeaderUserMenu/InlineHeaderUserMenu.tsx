import * as React from 'react';
import styled from 'styled-components';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

const Container = styled<{ open: boolean }, any>(List)`
  margin: 0 !important;
  max-height: 0;
  overflow-y: hidden;
  transition: max-height 0.2s linear;
  ${(props) => props.open && 'max-height: 100px'};
`;

const Item = styled(List.Item)`
  cursor: pointer;
  padding: 1rem !important;
  :hover {
    background: #ccc;
  }
`;

interface UserMenuProps {
  open: boolean;
  onSignOutClick(): any;
}

class InlineHeaderUserMenu extends React.Component<UserMenuProps> {
  render() {
    const { open, onSignOutClick } = this.props;

    return (
      <Container open={open}>
        <Item onClick={onSignOutClick}>
          <List.Icon name="log out" color="grey" />
          <List.Content>ログアウト</List.Content>
        </Item>
      </Container>
    );
  }
}

export { InlineHeaderUserMenu };
