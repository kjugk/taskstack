import * as React from 'react';
import * as types from '../../../types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

interface ListItemProps {
  item: types.TasklistState;
  onClick: (item: any) => any;
}

const Container = styled.li`
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  height: 3.4rem;
  padding-left: 1rem;
`;

const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 0.5rem;
`;

class ListItem extends React.Component<ListItemProps> {
  render() {
    const { item } = this.props;

    return (
      <Container>
        <TitleWrapper>{item.title}</TitleWrapper>
        <IconWrapper onClick={() => this.props.onClick(item)}>
          <Icon name="pencil" />
        </IconWrapper>
      </Container>
    );
  }
}

export { ListItem };
