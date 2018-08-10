import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from '../TaskListItem/TaskListItem';
import { Button, Icon } from 'semantic-ui-react';
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

interface CompletedTasksProps {
  items: types.TaskState[];
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
  onDeleteButtonClick(): any;
}

interface CompletedTasksState {
  openCompletedList: boolean;
}

class CompletedTasks extends React.Component<CompletedTasksProps, CompletedTasksState> {
  constructor(props: CompletedTasksProps) {
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
        <div style={{ marginBottom: '1rem' }}>
          <Button type="button" primary basic onClick={this.handleToggleButtonClick}>
            {items.length} 件の完了済みタスク
            <Chevron open={this.state.openCompletedList}>
              <Icon name="chevron down" style={{ margin: 0 }} />
            </Chevron>
          </Button>
        </div>

        {this.state.openCompletedList && (
          <div>
            <Segment.Group style={{ boxShadow: 'none' }}>
              {items.map((item: any, i: number) => {
                return <TaskListItem key={i} item={item} {...rest} />;
              })}
            </Segment.Group>

            <div style={{ textAlign: 'right' }}>
              <Button
                basic
                color="red"
                type="button"
                icon="trash"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('削除してよろしいですか?')) {
                    this.props.onDeleteButtonClick();
                  }
                }}
                content="完了済みを削除"
              />
            </div>
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
