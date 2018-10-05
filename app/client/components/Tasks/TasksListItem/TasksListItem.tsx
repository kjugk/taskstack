import * as React from 'react';
import * as types from '../../../types';
import styled, { keyframes } from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Checkbox from '../../Checkbox/Checkbox';

const fade = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(80%);
  }
`;

const Container = styled<{ fading: boolean; selecting: boolean; completed: boolean }, any>('div')`
  align-items: center;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  padding: 0.6rem;
  ${(props) => `
    background: ${props.theme.white};
    border: 1px solid ${props.theme.border};
    box-shadow: 0 1px 2px 0 ${props.theme.border}, 0 2px 3px 0 ${props.theme.grey};
  `};
  ${(props) => props.fading && `animation: ${fade} 0.5s 0.2s;`};
  ${(props) =>
    props.selecting &&
    `
      border: 1px solid ${props.theme.main}!important;
    `};
`;

const Title = styled<{ completed: boolean }, any>('span')`
  flex: 1;
  margin-left: 0.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) =>
    props.completed &&
    `
    text-decoration: line-through;
    color: ${props.theme.darkGrey};
  `};
`;

const ButtonLink = styled.a`
  outline: none;
  padding: 0.2rem 0.3rem;
  transition: background 0.15s;
  &:focus,
  &:hover,
  &:active {
    background: #eee;
    border-radius: 4px;
  }
  i {
    margin: 0 !important;
  }
`;

interface Props {
  item: types.TaskState;
  selectingId: number;
  onClickItem(id: number): any;
  onChangeCheck(id: number, params: any): any;
  onDestory?(id: number): any;
}

interface State {
  fading: boolean;
  completed: boolean;
}

class TasksListItem extends React.Component<Props, State> {
  private timerId: number;

  constructor(props: Props) {
    super(props);
    this.timerId = -1;
    this.state = { fading: false, completed: props.item.completed };
  }

  componentWillUnmount() {
    window.clearTimeout(this.timerId);
  }

  render() {
    const { item, selectingId, onClickItem, onChangeCheck, onDestory } = this.props;

    return (
      <Container
        fading={this.state.fading}
        completed={item.completed}
        selecting={item.id === selectingId}
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          onClickItem(item.id);
        }}
      >
        <Checkbox
          checked={this.state.completed}
          onClick={() => {
            this.setState((prevState: State) => ({
              fading: true,
              completed: !prevState.completed
            }));

            this.timerId = window.setTimeout(() => {
              onChangeCheck(item.id, { completed: !item.completed });
            }, 400);
          }}
        />
        <Title completed={this.state.completed}>{item.title}</Title>

        {item.memo !== '' && <Icon size="small" name="thumbtack" color="grey" />}

        {onDestory && (
          <ButtonLink
            href="#"
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              onDestory(item.id);
            }}
          >
            <Icon name="times circle" color="grey" />
          </ButtonLink>
        )}
      </Container>
    );
  }
}

export { TasksListItem };
