import * as React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

interface TaskTitleProps {
  title: string;
  isEditing: boolean;
  onClick(): any;
  onChange(title: string): any;
  onReset?(): any;
  onSubmit(title: string): any;
}

const Container = styled.div`
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

class TaskTitle extends React.Component<TaskTitleProps> {
  private input: any;

  componentDidUpdate(prevProps: TaskTitleProps) {
    if (!prevProps.isEditing && this.props.isEditing) {
      if (typeof this.input !== 'undefined') {
        this.input.focus();
      }
    }
  }

  render() {
    const { title, isEditing } = this.props;

    return (
      <Container>
        {isEditing && (
          <Input
            ref={(r: any) => (this.input = r)}
            value={title}
            onBlur={this.handleSubmit.bind(this)}
          />
        )}
        {!isEditing && <Title onClick={this.handleTitleClick.bind(this)}>{title}</Title>}
      </Container>
    );
  }

  private handleSubmit() {
    this.props.onSubmit(this.props.title);
  }

  private handleInputChange(e: any) {
    // TODO: esc だったら、リセットする
    this.props.onChange(e.target.value);
  }

  private handleTitleClick(e: any) {
    this.props.onClick();
  }
}

export { TaskTitle };
