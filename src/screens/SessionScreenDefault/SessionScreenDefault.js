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
    match: any,
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

    const {gameInPlay, match} = this.props;

    if (!gameInPlay) {
      console.log('redirecting to hub...');
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/hub`,
        }}/>
      );
    }

    return (
      <MainLayout>
        <SessionJoinedChecker joinedOnly={false}>
          <Redirect to={{
            pathname: `/session/${match.params.id}/join`,
          }}/>
        </SessionJoinedChecker>
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
    gameInPlay: isLoaded(session) && session.state === 'playing',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenDefault));
