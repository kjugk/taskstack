import * as React from 'react';
import styled from 'styled-components';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

interface Props {
  currentPosition: number;
}

class TutorialPosition extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Icon name="circle" color={this.getColor(1)} />
        <Icon name="circle" color={this.getColor(2)} />
      </div>
    );
  }

  private getColor(position: number) {
    if (position === this.props.currentPosition) {
      return 'blue';
    } else {
      return 'grey';
    }
  }
}

export { TutorialPosition };
