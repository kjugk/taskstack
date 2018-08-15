import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface CloseButtonProps {
  onClick(): any;
}

const CloseButton: React.SFC<CloseButtonProps> = (props) => (
  <Button basic color="grey" icon onClick={props.onClick}>
    <Icon name="close" />
  </Button>
);

export { CloseButton };
