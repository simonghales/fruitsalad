import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import DrawDuoGameHostNEW from '../../components/DrawDuoGameHostNEW/DrawDuoGameHost';
import DrawDuoDisplayDrawing from '../../newscreens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import {withRouter} from 'react-router';
import {AppState} from '../../../../redux/index';
import {SessionModel} from '../../logic/models';
import {getDisplayComponentFromGameStateNEW} from '../../functions';
import {getDisplayComponentFromGameState} from '../../logic/screens';
import DrawDuoDisplayCenteredMessage from '../../components/DrawDuoDisplayCenteredMessage/DrawDuoDisplayCenteredMessage';

class DrawDuoDisplay extends Component {

  props: {
    match: {
      params: {
        id: string,
      },
    },
    session: SessionModel,
    sessionLoaded: boolean,
    sessionEmpty: boolean,
    sessionValid: boolean,
  };

  constructor(props) {
    super(props);
  }

  renderContent() {
    const {match, session, sessionEmpty, sessionLoaded, sessionValid} = this.props;
    if (!sessionValid) {
      return (
        <DrawDuoDisplayCenteredMessage>
          {
            !sessionLoaded && (
              <h3>loading {match.params.id} session</h3>
            )
          }
          {
            sessionLoaded && sessionEmpty && (
              <h3>{match.params.id} not found</h3>
            )
          }
        </DrawDuoDisplayCenteredMessage>
      )
    } else {
      return getDisplayComponentFromGameState(session.drawDuo);
    }
  }

  render() {
    return (
      <div className='DrawDuoDisplay'>
        {/*<DrawDuoGameHostNEW/>*/}
        {
          this.renderContent()
        }
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
