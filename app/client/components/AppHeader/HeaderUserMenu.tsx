import * as React from 'react';
import styled from 'styled-components';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';

const Container = styled(List)`
  border-radius: 0.25rem;
  margin: 0 !important;
  overflow-y: hidden;
  position: absolute;
  right: 0;
  top: 120%;
  z-index: 100;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
  min-width: 10rem;
  ${(props) => `
    background: ${props.theme.white};
    color: ${props.theme.black};
  `};
`;

const Item = styled(List.Item)`
  cursor: pointer;
  padding: 1rem !important;
  transition: background 0.1s ease;
  &:hover {
    ${(props) => `background: ${props.theme.darkGrey};`};
  }
`;

interface Props {
  open: boolean;
  onClickSignOut(): any;
  onClickDestroyAccount(): any;
}

class HeaderUserMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOnClickDestroyAccount = this.handleOnClickDestroyAccount.bind(this);
  }

  render() {
    const { open, onClickSignOut, onClickDestroyAccount } = this.props;

    if (!open) return null;

    return (
      <Container size="mini">
        <Item onClick={onClickSignOut}>
          <List.Icon name="log out" color="grey" />
          <List.Content>ログアウト</List.Content>
        </Item>

        <Divider />

        <Item onClick={this.handleOnClickDestroyAccount} style={{ color: 'red' }}>
          <List.Icon name="log out" color="red" />
          <List.Content>アカウント削除</List.Content>
        </Item>
      </Container>
    );
  }

  private handleOnClickDestroyAccount() {
    if (window.confirm('全てのデータが削除されます。よろしいですか?')) {
      this.props.onClickDestroyAccount();
    }
  }
}

export { HeaderUserMenu };
