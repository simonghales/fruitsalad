import React, {Component} from 'react';
import './SessionScreenHub.css';
import {connect} from 'react-redux';
import SessionGroup from '../../components/SessionGroup/SessionGroup';
import GameSelector from '../../components/GameSelector/GameSelector';
import {AppState} from '../../redux/index';
import {Redirect, withRouter} from 'react-router';

class SessionScreenHub extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
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

    if (gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenHub'>
        <div className='SessionScreenHub__gameSelector'>
          <GameSelector/>
        </div>
        <div className='SessionScreenHub__group'>
          <SessionGroup/>
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHub));