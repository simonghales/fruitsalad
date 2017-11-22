import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SessionScreenHost.css';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {SessionState, setInvalidSessionEnforced, setSessionCreated} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import {generateNewSession} from '../../models/session';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import SessionScreenJoinBottom from '../SessionScreenJoin/SessionScreenJoinBottom';
import SessionScreenHostBottom from './SessionScreenHostBottom';
import {generateNewUser} from '../../models/user';
import {isEmpty, isLoaded} from 'react-redux-firebase';

class SessionScreenHost extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
    loadedSession: boolean,
    match: any,
    sessionCode: string,
    sessionCreated: boolean,
    setInvalidSessionEnforced(): void,
  };

  state: {
    sessionAlreadyCreated: boolean,
    sessionCreated: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionAlreadyCreated: false,
      sessionCreated: false,
    };
    this.checkAndCreateSession = this.checkAndCreateSession.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
    this.checkAndCreateSession();
  }

  checkAndCreateSession() {
    const {match} = this.props;

    this.context.store.firebase.ref('/sessions').orderByChild('id')
      .equalTo(match.params.id).limitToFirst(1).once('value', snapshot => {
      const sessionData = snapshot.val();
      if (!sessionData) {
        this.createSession();
      } else {
        console.log('already created...', sessionData);
        this.setState({
          sessionAlreadyCreated: true,
        });
      }
    });

  }

  createSession() {
    const {match} = this.props;

    const firebase = this.context.store.firebase;
    const currentUser = firebase.auth().currentUser;

    this.context.store.firebase
      .push('sessions', generateNewSession({
        id: match.params.id,
        users: {
          [currentUser.uid]: generateNewUser({
            id: currentUser.uid,
            name: 'The Host',
          })
        }
      }))
      .then((response) => {
        this.setState({
          sessionCreated: true,
        });
      })
  }

  render() {
    const {sessionAlreadyCreated, sessionCreated} = this.state;
    const {loadedSession, match, sessionCode} = this.props;

    if ((loadedSession && sessionAlreadyCreated) || (sessionCreated && loadedSession)) {
      console.log('redirecting to join???');
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      );
    }

    return (
      <MainLayout>
        <MainLayoutContent>
          <div className='SessionScreenHost'>
            <div className='SessionScreenHost__message'>
              <div className='SessionScreenHost__message__label'>Creating Session</div>
              <div className='SessionScreenHost__message__code'>{sessionCode}</div>
            </div>
          </div>
        </MainLayoutContent>
        <MainLayoutBottom>
          <SessionScreenHostBottom/>
        </MainLayoutBottom>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  return {
    loadedSession: isLoaded(sessions) && !isEmpty(sessions),
    sessionCode: state.session.sessionCode,
    sessionCreated: state.session.sessionCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHost));


