import * as React from 'react';
import * as types from '../../../types';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';

const Container = styled<{ isSelecting: boolean }, any>('li')`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 1rem;
  ${(props) =>
    props.isSelecting &&
    `transition: background .1s; background: ${props.theme.main}; color: #fff;`};
`;

const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
`;

const IconWrapper = styled.div`
  margin-left: 0.5rem;
`;

interface ListItemProps {
  isSelecting: boolean;
  item: types.TasklistState;
  onClick(id: number): any;
  onEditButtonClick(id: number): any;
}

class TasklistsListItem extends React.Component<ListItemProps> {
  render() {
    const { item, onClick, onEditButtonClick, isSelecting } = this.props;

    return (
      <Container isSelecting={isSelecting} onClick={() => onClick(item.id)}>
        <TitleWrapper>{item.title}</TitleWrapper>

        <span style={{ marginRight: '.5rem' }}>{item.taskCount}</span>

        {isSelecting && (
          <IconWrapper
            onClick={(e) => {
              e.stopPropagation();
              onEditButtonClick(item.id);
            }}
          >
            <Icon name="edit" />
          </IconWrapper>
        )}
      </Container>
    );
  }
}

export { TasklistsListItem };
