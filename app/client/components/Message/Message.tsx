import * as React from 'react';
import SurMessage from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';

const FADE_DURATION = 400;

const Container = styled<{ entered: boolean }, any>('div')`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  transition: transform ${FADE_DURATION}ms ease-in-out;
  transform: translateY(110%);
  ${(props) => `
    ${props.entered && 'transform: translate3D(0, 0, 0)'}
  `};
`;

interface Props {
  message: string;
  onHide(): any;
}

interface State {
  entered: boolean;
}

class Message extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { entered: false };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState(() => ({
        entered: true
      }));
    }, 0);

    window.setTimeout(() => {
      this.setState(() => ({
        entered: false
      }));

      window.setTimeout(() => {
        this.props.onHide();
      }, FADE_DURATION);
    }, 2000);
  }

  render() {
    const { message } = this.props;

    return (
      <Container entered={this.state.entered}>
        <SurMessage icon info>
          <Icon name="check circle outline" />
          <SurMessage.Content>
            <SurMessage.Header>{message}</SurMessage.Header>
          </SurMessage.Content>
        </SurMessage>
      </Container>
    );
  }
}

export { Message };
