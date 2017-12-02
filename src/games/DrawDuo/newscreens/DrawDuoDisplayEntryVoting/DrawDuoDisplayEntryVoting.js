import React, {Component} from 'react';
import './DrawDuoDisplayEntryVoting.css';
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

class DrawDuoDisplayEntryVoting extends Component {

  props: {
    state: string,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getUserKeys() {
    const {session} = this.props;
    const currentPairKey = getCurrentPairKey(session.drawDuo);
    const pairs = getPairs(session.drawDuo);
    const pair = getPair(currentPairKey, pairs);
    return getPairUsersKeys(pair);
  }

  isResults() {
    const {state} = this.props;
    return (state === DRAW_DUO_ENTRY_STATE_RESULTS);
  }

  isVoting() {
    const {state} = this.props;
    return (state === DRAW_DUO_ENTRY_STATE_VOTING);
  }

  renderTitle() {
    return (this.isResults()) ? 'Here are the results' : 'Select an answer!';
  }

  render() {
    const usersKeys = this.getUserKeys();
    return (
      <div className='DrawDuoDisplayEntryVoting'>
        <header className='DrawDuoDisplayEntryVoting__header'>
          <div className='DrawDuoDisplayEntryVoting__header__content'>
            <DrawDuoTitle>{this.renderTitle()}</DrawDuoTitle>
            {
              (this.isVoting()) && (
                <DrawDuoAnimatedMessage label='Select via your device'/>
              )
            }
          </div>
        </header>
        <div className='DrawDuoDisplayEntryVoting__content'>
          <DrawDuoArtworkPiece size='medium' userKey={(usersKeys && usersKeys[0]) ? usersKeys[0] : ''}
                               userSize='small'/>
          <div className='DrawDuoDisplayEntryVoting__answers'>
            <DrawDuoAnswers/>
          </div>
          <DrawDuoArtworkPiece size='medium' userKey={(usersKeys && usersKeys[1]) ? usersKeys[1] : ''}
                               userSize='small'/>
        </div>
        <footer className='DrawDuoDisplayEntryVoting__footer'>
          <DrawDuoRevealAnswers/>
        </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryVoting);
