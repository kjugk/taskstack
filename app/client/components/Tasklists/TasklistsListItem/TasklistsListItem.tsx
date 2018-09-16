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
  ${(props) =>
    props.isSelecting &&
    `
    transition: background .1s; background: ${props.theme.lightBlue};
    color: ${props.theme.main};
  `};
`;

const TitleWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 1rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
`;

const CountWrapper = styled.div`
  padding: 1rem;
`;

const EditIconWrapper = styled.div`
  padding: 1rem 0.6rem 1rem 0.7rem;
  ${(props) => `
    border-left: 1px solid ${props.theme.grey};
  `};
`;

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
      <EditIconWrapper
        onClick={(e) => {
          e.stopPropagation();
          onClickEditButton(item.id);
        }}
      >
        <Icon name="pencil" />
      </EditIconWrapper>
    )}
  </Container>
);

export { TasklistsListItem };
