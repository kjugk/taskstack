import React from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

const Link = styled.a`
  outline: none;
  padding: 0.2rem 0.3rem;
  transition: background 0.2s;
  &:focus,
  &:hover,
  &:active {
    background: #eee;
    border-radius: 4px;
  }
  i {
    margin: 0 !important;
  }
`;

interface Props {
  checked: boolean;
  theme: any;
  onClick(): any;
}

const Checkbox: React.SFC<Props> = ({ checked, onClick, theme }) => (
  <Link
    href="#"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    {checked && <Icon name="check square" style={{ color: theme.main }} />}
    {!checked && <Icon name="square outline" style={{ color: theme.black }} />}
  </Link>
);

export default withTheme(Checkbox);
