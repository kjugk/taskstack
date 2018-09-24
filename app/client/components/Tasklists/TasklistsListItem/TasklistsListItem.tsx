import * as React from 'react';
import * as types from '../../../types';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';

const Container = styled<{ isSelecting: boolean }, any>('li')`
  align-items: stretch;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  z-index: 4;
  ${(props) => `
    background: ${props.theme.grey};
    ${props.isSelecting &&
      `
      background: ${props.theme.lightBlue};
      color: ${props.theme.main};
    `}
  `};
`;

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 1rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
`;

const Count = styled.div`
  padding: 1rem;
`;

const EditIcon = styled.div`
  padding: 1rem 0.5rem 1rem 0.7rem;
  ${(props) => `
    border-left: 1px solid ${props.theme.grey};
  `};
`;

interface Props {
  selectingId: number;
  item: types.TasklistState;
  onClickItem(id: number): any;
  onClickEditButton(id: number): any;
}

const TasklistsListItem: React.SFC<Props> = ({
  item,
  onClickItem,
  onClickEditButton,
  selectingId
}) => (
  <Container isSelecting={selectingId === item.id} onClick={() => onClickItem(item.id)}>
    <Title>{item.title}</Title>
    <Count>{item.taskCount}</Count>

    {selectingId === item.id && (
      <EditIcon
        onClick={(e) => {
          e.stopPropagation();
          onClickEditButton(item.id);
        }}
      >
        <Icon name="pencil" />
      </EditIcon>
    )}
  </Container>
);

export { TasklistsListItem };
