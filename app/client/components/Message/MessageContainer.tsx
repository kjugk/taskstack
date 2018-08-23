import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import * as messageActions from '../../actions/messageActions';

const Container = styled<{ state: string }, any>('div')`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  transition: all 500ms ease-in-out;
  transform: translateY(110%);
  ${(props) => props.state === 'entering' && 'transform: translate3D(0,0,0)'};
`;

interface MessageContainerProps {
  message: string;
  setMessage: (message: string) => any;
}

/**
 * メッセージ(アプリグローバル)
 * TODO info, error を store の状態で 出し分ける。
 * もしくは、window クリックで閉じる。
 */
class MessageContainer extends React.Component<MessageContainerProps> {
  render() {
    const { message, setMessage } = this.props;

    return (
      <Transition
        in={message !== ''}
        timeout={{ enter: 2500 }}
        onEntered={() => {
          setTimeout(() => {
            setMessage('');
          }, 500);
        }}
      >
        {(state: any) => (
          <Container state={state}>
            <Message icon info>
              <Icon name="check circle outline" />
              <Message.Content>
                <Message.Header>{message}</Message.Header>
              </Message.Content>
            </Message>
          </Container>
        )}
      </Transition>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  message: state.message.message
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setMessage: (message: string) => messageActions.set(message)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
