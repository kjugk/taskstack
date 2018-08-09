import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface CloseButtonProps {
  onClick(): any;
}

export const CloseButton: React.SFC<CloseButtonProps> = (props) => (
  <Button basic color="black" icon onClick={props.onClick}>
    <Icon name="chevron right" />
  </Button>
);
