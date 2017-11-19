import React, {Component} from 'react';
import {
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session/reducer';
import SessionGroup from '../SessionGroup/SessionGroup';
import SessionInPlay from '../SessionInPlay/SessionInPlay';
import {AppState} from '../../redux/index';

class SessionHub extends Component {

  props: {
    gameInPlay: boolean,
    match: any,
    joined: boolean,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {gameInPlay, joined, match} = this.props;

    if (!joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      )
    }

    if (gameInPlay) {
      return <SessionInPlay {...this.props}/>
    }
    return <SessionGroup {...this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SessionHub);
