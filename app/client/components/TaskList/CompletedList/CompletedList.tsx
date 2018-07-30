import * as React from 'react';
import * as types from '../../../types';
import { Segment } from 'semantic-ui-react';
import { TaskListItem } from '../TaskListItem/TaskListItem';
import { Button } from 'semantic-ui-react';

interface ListProps {
  items: types.TaskState[];
  onItemClick(id: number): any;
  onCheckChange(id: number, params: any): any;
}

interface ListState {
  openCompletedList: boolean;
}

class CompletedList extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
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
        <Button type="button" secondary onClick={this.handleToggleButtonClick.bind(this)}>
          {items.length} 件の完了済みタスク
        </Button>

        {this.state.openCompletedList && (
          <Segment.Group>
            {items.map((item: any, i: number) => {
              return <TaskListItem key={i} item={item} {...rest} />;
            })}
          </Segment.Group>
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

export { CompletedList };
