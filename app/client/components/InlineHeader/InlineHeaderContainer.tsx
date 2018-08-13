import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as types from '../../types';
import * as userActions from '../../actions/userActions';
import { InlineHeader } from './InlineHeader';

const mapStateToProps = (state: types.RootState) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSignOutClick: () => userActions.signOut()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineHeader);
