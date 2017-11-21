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

class SessionScreenDefault extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
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

    const {gameInPlay, joined, match} = this.props;

    if (!joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      );
    }

    if (!gameInPlay) {
      console.log('redirecting to hub...');
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/hub`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenDefault'>
        <GoFullScreen/>
        <SessionInPlay/>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenDefault));
