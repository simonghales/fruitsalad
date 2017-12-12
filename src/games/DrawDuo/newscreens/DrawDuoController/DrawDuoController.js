import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {withRouter} from 'react-router';
import SessionInPlay from '../../../../components/SessionInPlay/SessionInPlay';

class DrawDuoController extends Component {

  props: {};

  render() {
    return <SessionInPlay/>
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedComponent = firebaseConnect((props, store) => {
  const sessionKey = props.match.params.id.toLowerCase();
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoController);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));
