import React, {Component} from 'react';
import './SessionScreenHub.css';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import SessionGroup from '../../components/SessionGroup/SessionGroup';
import GameSelector from '../../components/GameSelector/GameSelector';
import {AppState} from '../../redux/index';
import {Redirect, withRouter} from 'react-router';
import {setInvalidSessionEnforced} from '../../redux/reducers/session/reducer';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import SessionScreenHubBottom from './SessionScreenHubBottom';

class SessionScreenHub extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
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
  }

  render() {

    const {gameInPlay, joined, match, session} = this.props;

    console.log('session?', session);

    if (!joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      );
    }

    if (gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    return (
      <MainLayout>
        <MainLayoutContent>
          <div className='SessionScreenHub'>
            <div className='SessionScreenHub__gameSelector'>
              <GameSelector/>
            </div>
            <div className='SessionScreenHub__group'>
              <SessionGroup session={session}/>
            </div>
          </div>
        </MainLayoutContent>
        <MainLayoutBottom>
          <SessionScreenHubBottom/>
        </MainLayoutBottom>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    session: (sessions) ? sessions[Object.keys(sessions)[0]] : null,
    sessions: sessions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHub));