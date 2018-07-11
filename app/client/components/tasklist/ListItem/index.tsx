import * as React from 'react';
import * as types from '../../../types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled<{ isSelecting: boolean }, any>('li')`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 3.4rem;
  padding-left: 1rem;
  ${(props) =>
    props.isSelecting && 'transition: background .1s; background: #2185d0!important; color: #fff;'};
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

interface ListItemProps {
  isSelecting: boolean;
  item: types.TasklistState;
  onClick(id: number): any;
  onEditButtonClick(item: any): any;
}

class ListItem extends React.Component<ListItemProps> {
  render() {
    const { item, onClick, onEditButtonClick, isSelecting } = this.props;

    return (
      <Container isSelecting={isSelecting} onClick={() => onClick(item.id)}>
        <TitleWrapper>{item.title}</TitleWrapper>

        {isSelecting && (
          <IconWrapper onClick={() => onEditButtonClick(item)}>
            <Icon name="pencil" />
          </IconWrapper>
        )}
      </Container>
    );
  }
}

export { ListItem };
