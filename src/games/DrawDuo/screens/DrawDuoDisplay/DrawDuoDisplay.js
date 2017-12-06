import React, {Component} from 'react';
import './DrawDuoDisplay.css';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {withRouter} from 'react-router';
import {AppState} from '../../../../redux/index';
import {SessionModel} from '../../logic/models';
import {getDisplayComponentFromGameStateNEW} from '../../functions';
import {getDisplayComponentFromGameState} from '../../logic/screens';
import DrawDuoDisplayCenteredMessage from '../../components/DrawDuoDisplayCenteredMessage/DrawDuoDisplayCenteredMessage';
import DrawDuoDisplayPending from '../../newscreens/DrawDuoDisplayPending/DrawDuoDisplayPending';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import DrawDuoGameHost from '../../components/DrawDuoGameHost/DrawDuoGameHost';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import LargeHeading from '../../../../components/LargeHeading/LargeHeading';

class DrawDuoDisplay extends Component {

  props: {
    host: boolean,
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
          <LargeHeading>
            {
              !sessionLoaded && (
                <JumpingLetters label={`loading ${match.params.id} session`} size='huge'/>
              )
            }
            {
              sessionLoaded && sessionEmpty && (
                <JumpingLetters label={`${match.params.id} not found`} size='huge'/>
              )
            }
          </LargeHeading>
        </DrawDuoDisplayCenteredMessage>
      )
    } else if (!session.drawDuo) {
      return (
        <DrawDuoDisplayPending/>
      )
    } else {
      return getDisplayComponentFromGameState(session.drawDuo);
    }
  }

  render() {
    const {host} = this.props;
    return (
      <div className='DrawDuoDisplay'>
        {
          (host) && <DrawDuoGameHost/>
        }
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
