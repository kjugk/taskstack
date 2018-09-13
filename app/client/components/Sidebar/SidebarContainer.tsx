import * as React from 'react';
import * as types from '../../types';
import styled, { withTheme } from 'styled-components';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive';
import TasklistsContainer from '../Tasklists/TasklistsContainer';
import TasklistCreateButtonContainer from '../TasklistCreateButton/TasklistCreateButtonContainer';
import * as sidebarActions from '../../actions/sidebarActions';
import { connect } from 'react-redux';

const Sidebar = styled.div`
  display: flex;
  flex-basis: 260px;
  flex-direction: column;
  height: 100%;
  max-width: 260px;
  position: relative;
  ${(props) => `
    background: ${props.theme.grey};
    border-right: 1px solid ${props.theme.border}
  `};
`;

const MobileSidebar = styled<{ open: boolean }, any>('div')`
  left: 0;
  top: 0;
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  will-change: transform;
  transform: translateX(-100%);
  transition: transform 0.25s linear;
  ${(props) => `
    background: ${props.theme.grey};
    ${props.open && 'transform: translateX(0);'}
  `};
`;

const MobileOverlay = styled<{ open: boolean }, any>('div')`
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  z-index: 2;
  opacity: 0;
  width: 0;
  will-change: opacity;
  transition: opacity 0.2s ease;
  ${(props) => props.open && 'opacity: 1; width: 100%;'};
`;

const Brand = styled.div`
  padding: 1rem;
  line-height: 1;
  ${(props) => `
    color: ${props.theme.white};
    background: ${props.theme.main};
  `};
`;

const Overlay: React.SFC = (props: any) => (
  <MobileOverlay open={props.open} onClick={props.onClick} />
);

interface Props {
  sidebar: types.SidebarState;
  dispatch: any;
}

class SidebarContainer extends React.Component<Props> {
  render() {
    const { sidebar } = this.props;

    return (
      <>
        <Responsive as={Sidebar} minWidth={768}>
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Responsive>

        <Responsive as={MobileSidebar} maxWidth={767} open={sidebar.isOpen}>
          <Brand>TaskStack</Brand>
          <TasklistsContainer />
          <TasklistCreateButtonContainer />
        </Responsive>
        <Responsive
          as={Overlay}
          maxWidth={767}
          open={sidebar.isOpen}
          onClick={() => this.props.dispatch(sidebarActions.close())}
        />
      </>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  sidebar: state.sidebar
});

export default withTheme(connect(mapStateToProps)(SidebarContainer));
