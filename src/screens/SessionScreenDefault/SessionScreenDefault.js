import React, {Component} from 'react';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import './SessionScreenDefault.css';
import {SessionState, setInvalidSessionEnforced, setShowSessionBottom} from '../../redux/reducers/session/reducer';
import SessionInPlay from '../../components/SessionInPlay/SessionInPlay';
import GoFullScreen from '../../components/GoFullScreen/GoFullScreen';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import SessionJoinedChecker from '../session/components/SessionJoinedChecker/SessionJoinedChecker';
import {AppState} from '../../redux/index';
import {isLoaded} from 'react-redux-firebase';

class SessionScreenDefault extends Component {

  props: {
    gameInPlay: boolean,
    history: {},
    match: any,
    sessionCode: string,
    setInvalidSessionEnforced(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
    this.tryToRedirectToHub();
  }

  tryToRedirectToHub() {

    const {gameInPlay, history, sessionCode} = this.props;

    if (!gameInPlay) {
      console.log('redirecting to hub...');
      history.push(`/session/${sessionCode}/hub`);
    }

  }

  render() {

    return (
      <MainLayout>
        <MainLayoutContent>
          <div className='SessionScreenDefault'>
            <GoFullScreen/>
            <SessionInPlay/>
          </div>
        </MainLayoutContent>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
    sessionCode: state.session.sessionCode,
    gameInPlay: isLoaded(session) && session.state === 'playing',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenDefault));
