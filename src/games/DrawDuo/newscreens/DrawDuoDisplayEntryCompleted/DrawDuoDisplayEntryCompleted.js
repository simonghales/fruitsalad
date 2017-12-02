import React, {Component} from 'react';
import './DrawDuoDisplayEntryCompleted.css';
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
import {getCurrentPairKey, getPair, getPairs, getPairUsersKeys} from '../../logic/users';
import DrawDuoArtworkPiece from '../../components/DrawDuoArtworkPiece/DrawDuoArtworkPiece';
import DrawDuoAnswers from '../../components/DrawDuoAnswers/DrawDuoAnswers';
import DrawDuoRevealAnswers from '../../components/DrawDuoRevealAnswers/DrawDuoRevealAnswers';
import {DRAW_DUO_ENTRY_STATE_RESULTS, DRAW_DUO_ENTRY_STATE_VOTING} from '../../logic/constants';
import DrawDuoPairsResults from '../../components/DrawDuoPairsResults/DrawDuoPairsResults';

class DrawDuoDisplayEntryCompleted extends Component {

  props: {
    state: string,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    return (
      <div className='DrawDuoDisplayEntryCompleted'>
        <div className='DrawDuoDisplayEntryCompleted__drawings'>
          <DrawDuoArtworkPiece size='medium' userKey={''}
                               userSize='small' hideUser={true}/>
          <DrawDuoArtworkPiece size='medium' userKey={''}
                               userSize='small' hideUser={true}/>
        </div>
        <div className='DrawDuoDisplayEntryCompleted__users'>
          <DrawDuoPairsResults/>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryCompleted);
