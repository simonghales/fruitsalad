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

class DrawDuoDisplayEntryVoting extends Component {

  props: {
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

  render() {
    const usersKeys = this.getUserKeys();
    return (
      <div className='DrawDuoDisplayEntryVoting'>
        <header className='DrawDuoDisplayEntryVoting__header'>
          <div className='DrawDuoDisplayEntryVoting__header__content'>
            <DrawDuoTitle>Select an answer!</DrawDuoTitle>
            <DrawDuoAnimatedMessage label='Select via your device'/>
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
        <footer className='DrawDuoDisplayEntryVoting__footer'></footer>
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
