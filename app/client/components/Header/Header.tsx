import * as React from 'react';
import * as types from '../../types';
import styled from 'styled-components';
import InlineHeaderContainer from '../InlineHeader/InlineHeaderContainer';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0.8rem 1rem;
  ${(props) => `
    color: ${props.theme.white};
    background: ${props.theme.main};
  `};
`;

const Brand = styled.div`
  font-weight: 800;
  font-size: 1.4rem;
  line-height: 1;
`;

const TasklistTitle = styled.div`
  flex: 1;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 0.5rem;
`;

interface Props {
  tasklist: types.TasklistState | undefined;
  onClickBars(): any;
}

class Header extends React.Component<Props> {
  render() {
    const { tasklist, onClickBars } = this.props;

    return (
      <Container>
        <div>
          <Responsive minWidth={768} fireOnMount as={() => <Brand>TaskStack</Brand>} />
          <Responsive
            maxWidth={767}
            fireOnMount
            as={() => <Icon name="bars" size="large" onClick={onClickBars} />}
          />
        </div>
        <TasklistTitle>
          {tasklist && (
            <Responsive fireOnMount maxWidth={767} as={() => <span>{tasklist.title}</span>} />
          )}
        </TasklistTitle>
        <InlineHeaderContainer />
      </Container>
    );
  }
}

export { Header };
