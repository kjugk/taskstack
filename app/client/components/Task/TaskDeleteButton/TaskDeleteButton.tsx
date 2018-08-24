import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

interface DeleteButtonProps {
  onClick(): any;
}

export const TaskDeleteButton: React.SFC<DeleteButtonProps> = (props) => (
  <Button basic color="red" content="削除" fluid icon="trash" onClick={props.onClick} />
);
