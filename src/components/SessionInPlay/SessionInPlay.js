import React, {Component} from 'react';
import './SessionInPlay.css';
import {connect} from 'react-redux';
import {SessionState} from '../../redux/reducers/session/reducer';
import DrawDuoHub from '../../games/DrawDuo/components/DrawDuoHub/DrawDuoHub';
import {AppState} from '../../redux/index';

class SessionInPlay extends Component {

  props: {
    gameInPlay: boolean,
    match: any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DrawDuoHub/>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    gameInPlay: state.session.gameInPlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionInPlay);
