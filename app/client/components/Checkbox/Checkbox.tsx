import React from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import { withTheme } from 'styled-components';

interface Props {
  checked: boolean;
  theme: any;
  onClick(): any;
}

const Checkbox: React.SFC<Props> = ({ checked, onClick, theme }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    {checked && <Icon name="check square" style={{ color: theme.main }} />}
    {!checked && <Icon name="square outline" style={{ color: theme.black }} />}
  </a>
);

export default withTheme(Checkbox);
