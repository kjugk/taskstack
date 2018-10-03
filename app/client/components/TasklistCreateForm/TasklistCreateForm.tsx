import * as React from 'react';
import * as types from '../../types';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';
import { TasklistForm } from '../TasklistForm/TasklistForm';

interface Props {
  formState: types.TasklistCreateFormState;
  onChangeTitle(title: string): any;
  onSubmit(): any;
  onClose(): any;
}

interface State {
  open: boolean;
}

/**
 * Tasklist 作成フォーム
 */
class TasklistCreateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    const { formState, onChangeTitle, onSubmit, onClose } = this.props;

    return (
      <Transition
        animation="scale"
        duration={180}
        visible={this.state.open}
        transitionOnMount={true}
        unmountOnHide={true}
        onHide={onClose}
      >
        <Modal
          centered={false}
          closeOnEscape={!formState.isSubmitting}
          closeOnDimmerClick={!formState.isSubmitting}
          open={true}
          size="tiny"
          onClose={this.handleClose}
        >
          <Modal.Header>
            <div style={{ fontWeight: 400 }}>リストを作成</div>
          </Modal.Header>
          <Modal.Content>
            {formState.isSubmitting && (
              <Dimmer active>
                <Loader inline="centered">作成中...</Loader>
              </Dimmer>
            )}

            <TasklistForm
              canDestroy={false}
              title={formState.title}
              onChangeTitle={onChangeTitle}
              onClickClose={this.handleClose}
              onSubmit={onSubmit}
            />
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }

  private handleClose() {
    this.setState(() => ({ open: false }));
  }
}

export { TasklistCreateForm };
