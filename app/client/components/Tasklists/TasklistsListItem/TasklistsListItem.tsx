import * as React from 'react';
import * as types from '../../../types';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';

const Container = styled<{ isSelecting: boolean }, any>('li')`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  ${(props) =>
    props.isSelecting &&
    `
    transition: background .1s; background: ${props.theme.darkGrey};
    color: ${props.theme.main};
  `};
`;

const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
`;

const CountWrapper = styled.div`
  margin-right: 0.7rem;
`;

const EditIcon: React.SFC<{ onClick(): any }> = ({ onClick }) => (
  <span
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <Icon name="edit" />
  </span>
);

interface Props {
  isSelecting: boolean;
  item: types.TasklistState;
  onClickItem(id: number): any;
  onClickEditButton(id: number): any;
}

const TasklistsListItem: React.SFC<Props> = ({
  item,
  onClickItem,
  onClickEditButton,
  isSelecting
}) => (
  <Container isSelecting={isSelecting} onClick={() => onClickItem(item.id)}>
    <TitleWrapper>{item.title}</TitleWrapper>
    <CountWrapper>{item.taskCount}</CountWrapper>

    {isSelecting && (
      <EditIcon
        onClick={() => {
          onClickEditButton(item.id);
        }}
      />
    )}
  </Container>
);

export { TasklistsListItem };
