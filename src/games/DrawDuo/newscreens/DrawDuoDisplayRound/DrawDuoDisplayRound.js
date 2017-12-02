import React, {Component} from 'react';
import './DrawDuoDisplayRound.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoArtworks from '../../components/DrawDuoArtworks/DrawDuoArtworks';
import DrawDuoTitle from '../../components/DrawDuoTitle/DrawDuoTitle';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import DrawDuoUserGuessesIndicators from '../../components/DrawDuoUserGuessesIndicators/DrawDuoUserGuessesIndicators';
import {getCurrentPairKey} from '../../logic/users';
import DrawDuoDisplayEntryGuessing from '../DrawDuoDisplayEntryGuessing/DrawDuoDisplayEntryGuessing';
import DrawDuoDisplayEntryVoting from '../DrawDuoDisplayEntryVoting/DrawDuoDisplayEntryVoting';
import {getEntryDisplayComponentFromGameState} from '../../logic/screens';

class DrawDuoDisplayRound extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    const {session} = this.props;
    return (
      <div className='DrawDuoDisplayRound'>
        {getEntryDisplayComponentFromGameState(session.drawDuo)}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayRound);
