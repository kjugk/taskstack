import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

interface CloseButtonProps {
  onClick(): any;
}

const TaskCloseButton: React.SFC<CloseButtonProps> = (props) => (
  <Button basic color="grey" icon size="mini" onClick={props.onClick}>
    <Icon name="chevron right" />
  </Button>
);

export { TaskCloseButton };
