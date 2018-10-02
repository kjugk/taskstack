import * as React from 'react';
import * as types from '../../types';
import * as sidebarActions from '../../actions/sidebarActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sidebar } from './Sidebar';

interface Props {
  sidebar: types.SidebarState;
  close(): any;
}

const SidebarContainer: React.SFC<Props> = ({ sidebar, close, children }) => (
  <Sidebar open={sidebar.isOpen} onClose={close}>
    {children}
  </Sidebar>
);

const mapStateToProps = (state: types.RootState) => ({
  sidebar: state.sidebar
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  close: () => dispatch(sidebarActions.close())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
