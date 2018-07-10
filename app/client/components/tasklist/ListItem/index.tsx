import * as React from 'react';
import * as types from '../../../types';

import styled from 'styled-components';

interface ListItemProps {
  item: types.TasklistState;
  onClick: (item: any) => any;
}

const Wrapper = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

class ListItem extends React.Component<ListItemProps> {
  render() {
    const { item } = this.props;

    return <Wrapper onClick={() => this.props.onClick(item)}>{item.title}</Wrapper>;
  }
}

export { ListItem };
