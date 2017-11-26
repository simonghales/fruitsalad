import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {getDisplayComponentFromGameState} from '../../../../models/drawDuo';

class DrawDuoDisplay extends Component {

  props: {
    session: {},
  };

  render() {
    const {session} = this.props;
    const sessionLoaded = isLoaded(session);
    if (!sessionLoaded) return null;
    console.log('session', session, 'loaded?', sessionLoaded);
    return (
      <div className='DrawDuoDisplay'>
        {getDisplayComponentFromGameState(session.drawDuo)}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedComponent = firebaseConnect((props, store) => {
  const sessionKey = 'ENTRY_VOTING';
  // const sessionKey = 'HALES';
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoDisplay);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
