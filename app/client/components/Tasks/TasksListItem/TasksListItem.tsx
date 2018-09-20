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
    transform: translateX(70%);
  }
`;

const Container = styled<{ fading: boolean; selecting: boolean; completed: boolean }, any>('div')`
  align-items: center;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  padding: 0.6rem 1rem;
  ${(props) => `
    background: ${props.theme.white};
    border: 1px solid ${props.theme.border};
    box-shadow: 0 1px 2px 0 ${props.theme.border};
  `};
  ${(props) => props.fading && `animation: ${fade} 0.3s 0.15s;`};
  ${(props) =>
    props.selecting &&
    `
      border: 1px solid ${props.theme.main}!important;
    `};
`;

const Title = styled<{ completed: boolean }, any>('span')`
  flex: 1;
  margin-left: 0.8rem;
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

interface Props {
  item: types.TaskState;
  selectingId: number;
  onClickItem(id: number): any;
  onChangeCheck(id: number, params: any): any;
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
    const { item, selectingId, onClickItem, onChangeCheck } = this.props;

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
            }, 300);
          }}
        />
        <Title completed={this.state.completed}>{item.title}</Title>
        {item.memo !== '' && <Icon size="small" name="thumbtack" color="grey" />}
      </Container>
    );
  }
}

export { TasksListItem };
