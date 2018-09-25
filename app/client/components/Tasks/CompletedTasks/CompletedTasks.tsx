import * as React from 'react';
import * as types from '../../../types';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';

const Chevron = styled<{ open: boolean }, any>('span')`
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 0.25s;
  margin-left: 0.5rem;
  i {
    margin: 0;
  }
  ${(props) => props.open && 'transform: rotate(-180deg)'};
`;

interface Props {
  items: types.TaskState[];
  selectingId: number;
  onClickItem(id: number): any;
  onDestory(id: number): any;
  onChangeCheck(id: number, params: any): any;
}

interface State {
  openCompletedList: boolean;
}

class CompletedTasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.state = {
      openCompletedList: false
    };
  }

  render() {
    const { items, ...rest } = this.props;

    if (items.length <= 0) return null;

    return (
      <>
        <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
          <Button type="button" size="mini" onClick={this.handleToggleButtonClick}>
            {items.length} 件の完了済みタスク
            <Chevron open={this.state.openCompletedList}>
              <Icon name="chevron down" style={{ margin: 0 }} />
            </Chevron>
          </Button>
        </div>

        {this.state.openCompletedList && (
          <div style={{ boxShadow: 'none', marginBottom: '1rem' }}>
            {items.map((item: any, i: number) => {
              return <TasksListItem key={item.id} item={item} {...rest} />;
            })}
          </div>
        )}
      </>
    );
  }

  private handleToggleButtonClick(e: any) {
    e.stopPropagation();

    this.setState((prevState) => ({
      openCompletedList: !prevState.openCompletedList
    }));
  }
}

export { CompletedTasks };
