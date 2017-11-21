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

class SessionScreenHost extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
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
        this.setState({
          sessionAlreadyCreated: true,
        });
      }
    });

  }

  createSession() {
    const {match} = this.props;

    this.context.store.firebase
      .push('sessions', generateNewSession({
        id: match.params.id,
      }))
      .then(() => {
        this.setState({
          sessionCreated: true,
        })
      })
  }

  render() {
    const {sessionAlreadyCreated, sessionCreated} = this.state;
    const {match, sessionCode} = this.props;

    if (sessionAlreadyCreated || sessionCreated) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenHost'>
        <div className='SessionScreenHost__message'>
          <div className='SessionScreenHost__message__label'>Creating Session</div>
          <div className='SessionScreenHost__message__code'>{sessionCode}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
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


