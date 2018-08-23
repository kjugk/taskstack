import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearError } from '../../actions/appActions';

const Screen = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  dispatch: any;
}

class UnknownErrorScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(clearError());
  }

  render() {
    return (
      <Screen>
        <div>
          <h3>エラーが発生しました</h3>
          <Button
            primary
            icon="plus"
            content="再読み込み"
            size="large"
            onClick={() => {
              location.href = '/';
            }}
          />
        </div>
      </Screen>
    );
  }
}

export default connect()(UnknownErrorScreen);
