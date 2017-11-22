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

class SessionScreen extends Component {

  props: {
    match: any,
    history: any,
    showSessionBottom: boolean,
    quitModalOpen: boolean,
    loadedSession: boolean,
    invalidSession: boolean,
    invalidSessionEnforced: boolean,
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
    setSessionCode(match.params.id);
  }

  quitSession() {
    const {closeQuitModal, history} = this.props;
    closeQuitModal();
    history.push('/');
  }

  render() {
    const {closeQuitModal, match, showSessionBottom, quitModalOpen, invalidSession, invalidSessionEnforced} = this.props;
    const sessionCode = match.params.id;
    return (
      <div className='SessionScreen'>
        <SessionScreenRoutes top={true}/>
        <TransitionGroup>
          {
            quitModalOpen ? (
              <CSSTransition
                timeout={350}
                classNames='fade'
                key='quitSession'>
                <QuitSession close={closeQuitModal} sessionCode={sessionCode} quit={this.quitSession}/>
              </CSSTransition>
            ) : null
          }
        </TransitionGroup>
        <TransitionGroup>
          {
            (invalidSession && invalidSessionEnforced) ? (
              <CSSTransition
                timeout={350}
                classNames='fade'
                key='quitSession'>
                <SessionNotFound sessionCode={sessionCode}/>
              </CSSTransition>
            ) : null
          }
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  console.log('sessions?', sessions);
  return {
    showSessionBottom: state.session.showSessionBottom,
    quitModalOpen: state.session.quitModalOpen,
    loadedSession: isLoaded(sessions),
    invalidSession: isLoaded(sessions) && isEmpty(sessions),
    invalidSessionEnforced: state.session.invalidSessionEnforced,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeQuitModal: () => dispatch(closeQuitModal()),
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

const wrappedSessionScreen = firebaseConnect((props, store) => {
  const state = store.getState();
  const sessions = state.firebase.data.sessions;
  const sessionKey = (sessions) ? Object.keys(sessions)[0] : null;
  let queries = [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
    }
  ];
  if (sessionKey) {
    queries.push({
      path: `/sessions/${sessionKey}/users`,
      storeAs: 'sessionUsers',
    });
  }
  return queries;
})(SessionScreen);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedSessionScreen));

