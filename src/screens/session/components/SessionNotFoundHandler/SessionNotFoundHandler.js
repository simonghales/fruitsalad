import React, {Component} from 'react';
import './SessionNotFoundHandler.css';
import {connect} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

class SessionNotFoundHandler extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}

// const mapStateToProps = (state: AppState) => {
//   return {};
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionNotFound));

export default withRouter(SessionNotFoundHandler);
