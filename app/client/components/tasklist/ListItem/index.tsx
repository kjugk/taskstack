import * as React from 'react';
import * as types from '../../../types';

import styled from 'styled-components';

interface ListItemProps {
  item: types.TasklistState;
}

const Wrapper = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

class ListItem extends React.Component<ListItemProps> {
  render() {
    const { item } = this.props;

    return <Wrapper>{item.title}</Wrapper>;
  }
}

export { ListItem };
