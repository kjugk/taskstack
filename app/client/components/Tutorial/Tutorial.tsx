import * as React from 'react';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { TutorialFirst } from './TutorialFirst';
import { TutorialSecond } from './TutorialSecond';
import { TutorialPosition } from './TutorialPosition';

interface State {
  currentPage: number;
  lastPage: number;
  open: boolean; // このフラグで管理しないようにする(stateを更新する)
}

class Tutorial extends React.Component<object, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: 1,
      lastPage: 2,
      open: true
    };
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  render() {
    if (!this.state.open) return null;

    return (
      <Modal closeOnEscape={false} closeOnDimmerClick={false} open={true} size="tiny">
        <Modal.Content>
          {this.renderContent()}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Button
              type="button"
              size="small"
              content={this.isLastPage() ? 'Start!' : 'Next'}
              onClick={this.handleNextClick}
            />
          </div>
          <TutorialPosition currentPosition={this.state.currentPage} />
        </Modal.Content>
      </Modal>
    );
  }

  private isLastPage() {
    const { currentPage, lastPage } = this.state;
    return currentPage === lastPage;
  }

  private renderContent() {
    switch (this.state.currentPage) {
      case 1:
        return <TutorialFirst />;

      case 2:
        return <TutorialSecond />;

      default:
        return <TutorialFirst />;
    }
  }

  private handleNextClick() {
    if (this.isLastPage()) {
      this.setState(() => ({ open: false }));
      return;
    }

    this.setState((currentState: State) => ({ currentPage: currentState.currentPage + 1 }));
  }
}

export { Tutorial };
