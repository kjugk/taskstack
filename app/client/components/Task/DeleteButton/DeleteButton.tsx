import * as React from 'react';
import { Button } from 'semantic-ui-react';

interface DeleteButtonProps {
  onClick(): any;
}

export const DeleteButton: React.SFC<DeleteButtonProps> = (props) => (
  <Button basic color="red" content="削除" fluid icon="trash" onClick={props.onClick} />
);
