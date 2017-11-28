import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {getDisplayComponentFromGameState} from '../../functions';
import {DrawDuoGame} from '../../models';
import {withRouter} from 'react-router';
import DrawDuoGameHost from '../../components/DrawDuoGameHost/DrawDuoGameHost';

class DrawDuoDisplay extends Component {

  props: {
    host: boolean,
    session: {
      drawDuo: DrawDuoGame,
    },
    sessionLoaded: boolean,
    sessionEmpty: boolean,
    sessionValid: boolean,
  };

  renderContent() {
    const {session, sessionEmpty, sessionLoaded, sessionValid} = this.props;
    if (!sessionValid) {
      return (
        <div className='DrawDuoDisplay__message'>
          {
            !sessionLoaded && (
              <div>
                LOADING SESSION
              </div>
            )
          }
          {
            sessionLoaded && sessionEmpty && (
              <div>
                NO SESSION FOUND
              </div>
            )
          }
        </div>
      )
    } else {
      return getDisplayComponentFromGameState(session.drawDuo);
    }
  }

  render() {
    const {host} = this.props;
    return (
      <div className='DrawDuoDisplay'>
        {host && <DrawDuoGameHost/>}
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
    sessionLoaded: isLoaded(session),
    sessionEmpty: isEmpty(session),
    sessionValid: !isEmpty(session) && isLoaded(session),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedComponent = firebaseConnect((props, store) => {
  const sessionKey = props.match.params.id.toUpperCase();
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    }
  ];
  return queries;
})(DrawDuoDisplay);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));
