import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from '../TaskListItem/TaskListItem';
import { Button } from 'semantic-ui-react';

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
          <Button type="button" secondary onClick={this.handleToggleButtonClick.bind(this)}>
            {items.length} 件の完了済みタスク
          </Button>
        </div>

        {this.state.openCompletedList && (
          <div>
            <Segment.Group>
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

  private handleToggleButtonClick() {
    this.setState({
      openCompletedList: !this.state.openCompletedList
    });
  }
}

export { CompletedTasks };
