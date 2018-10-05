import * as React from 'react';
import * as types from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as messageActions from '../../actions/messageActions';
import { Message } from './Message';

interface MessageContainerProps {
  message: string;
  setMessage(message: string): any;
}

class MessageContainer extends React.Component<MessageContainerProps> {
  render() {
    const { message, setMessage } = this.props;
    if (!message || message === '') return null;

    return <Message message={message} onHide={() => setMessage('')} />;
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
