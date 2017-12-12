import React, {Component} from 'react';
import './SessionScreen.css';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {
  withRouter,
} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import QuitSession from '../../modals/QuitSession/QuitSession';
import {closeQuitModal, SessionState, setSessionCode} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import SessionScreenRoutes from '../SessionScreenRoutes/SessionScreenRoutes';
import SessionNotFound from '../../modals/SessionNotFound/SessionNotFound';
import Screen from '../../components/Screen/Screen';
import FullScreenLoadingMessage from '../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import {SessionModel} from '../../games/DrawDuo/logic/models';
import {getSessionControllerComponentFromSessionState} from '../../games/DrawDuo/logic/screens';

class SessionScreen extends Component {

  props: {
    currentUserKey: string,
    match: any,
    history: any,
    showSessionBottom: boolean,
    quitModalOpen: boolean,
    loadedSession: boolean,
    invalidSession: boolean,
    invalidSessionEnforced: boolean,
    session: SessionModel,
    closeQuitModal(): void,
    setSessionCode(sessionCode: string): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.quitSession = this.quitSession.bind(this);
  }

  componentDidMount() {
    const {match, setSessionCode} = this.props;
    setSessionCode(match.params.id.toLowerCase());
  }

  quitSession() {
    const {closeQuitModal, history} = this.props;
    closeQuitModal();
    history.push('/');
  }

  render() {
    const {currentUserKey, match, loadedSession, session} = this.props;
    const sessionCode = match.params.id.toLowerCase();

    if (!loadedSession) {
      return (
        <FullScreenLoadingMessage title={sessionCode} subtitle='loading...' subtitleSize='small'/>
      )
    }

    return (
      <Screen>
        <div className='SessionScreen'>
          {
            getSessionControllerComponentFromSessionState(session, currentUserKey)
          }
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState, {firebase}) => {
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  console.log('currentUserKey', currentUser.uid);
  return {
    currentUserKey: currentUser.uid,
    loadedSession: isLoaded(session),
    invalidSession: isLoaded(session) && isEmpty(session),
    invalidSessionEnforced: state.session.invalidSessionEnforced,
    session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeQuitModal: () => dispatch(closeQuitModal()),
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

export default firebaseConnect((props, store) => {
  const sessionKey = props.match.params.id.toLowerCase();
  let queries = [
    {
      path: `/sessions/${sessionKey}`,
      storeAs: 'session',
    },
    {
      path: `/sessions/${sessionKey}/users`,
      storeAs: 'sessionUsers',
    }
  ];
  return queries;
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionScreen)));

