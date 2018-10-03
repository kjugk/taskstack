import * as React from 'react';
import styled from 'styled-components';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

const Container = styled(List)`
  border-radius: 0.25rem;
  margin: 0 !important;
  overflow-y: hidden;
  position: absolute;
  right: 0;
  top: 120%;
  z-index: 100;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
  min-width: 140px;
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
  onSignOutClick(): any;
}

const HeaderUserMenu: React.SFC<Props> = ({ open, onSignOutClick }) => {
  if (!open) return null;

  return (
    <Container size="mini">
      <Item onClick={onSignOutClick}>
        <List.Icon name="log out" color="grey" />
        <List.Content>ログアウト</List.Content>
      </Item>
    </Container>
  );
};

export { HeaderUserMenu };
