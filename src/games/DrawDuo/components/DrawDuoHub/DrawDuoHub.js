import React, {Component} from 'react';
import './DrawDuoHub.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import DrawDuoDrawing from '../DrawDuoDrawing/DrawDuoDrawing';
import DrawDuoGuess from '../DrawDuoGuess/DrawDuoGuess';
import DrawDuoVote from '../DrawDuoVote/DrawDuoVote';
import {AppState} from '../../../../redux/index';
import {getCurrentScreen} from '../../../../redux/reducers/drawDuo/state';
import {getComponentFromCurrentScreen} from '../../config';
import DrawDuoGameHost from '../DrawDuoGameHost/DrawDuoGameHost';
import {DrawDuoGame} from '../../models';
import {getControllerComponentFromGameState} from '../../functions';
import {isLoaded} from 'react-redux-firebase';

class DrawDuoHub extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {session} = this.props;
    console.log('session', session);
    return (
      <div className='DrawDuoHub'>
        <DrawDuoGameHost/>
        {
          isLoaded(session) && getControllerComponentFromGameState(session.drawDuo)
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoHub);
