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
import DrawDuoDisplayFooter from '../../components/DrawDuoDisplayFooter/DrawDuoDisplayFooter';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import Heading from '../../../../components/Heading/Heading';
import {getGuessingTimer, getVotingTimer} from '../../logic/game';

class DrawDuoDisplayEntryVoting extends Component {

  props: {
    votingDuration: number,
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
    return (this.isResults()) ? 'here are the results' : 'select an answer!';
  }

  render() {
    const {votingDuration} = this.props;
    const usersKeys = this.getUserKeys();
    return (
      <div className='DrawDuoDisplayEntryVoting'>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <header className='DrawDuoDisplayEntryVoting__header'>
              <div className='DrawDuoDisplayEntryGuessing__header__title'>
                <Heading>{this.renderTitle()}</Heading>
              </div>
              <div className='DrawDuoDisplayEntryGuessing__header__subtitle'>
                {
                  (this.isVoting()) && (
                    <Heading size='small'>
                      <JumpingLetters label={`select via your device`} intensity='less'/>
                    </Heading>
                  )
                }
              </div>
            </header>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody>
            <div className='DrawDuoDisplayEntryVoting__content'>
              <DrawDuoArtworkPiece size='medium' userKey={(usersKeys && usersKeys[0]) ? usersKeys[0] : ''}
                                   userSize='tiny'/>
              <div className='DrawDuoDisplayEntryVoting__answers'>
                <DrawDuoAnswers/>
              </div>
              <DrawDuoArtworkPiece size='medium' userKey={(usersKeys && usersKeys[1]) ? usersKeys[1] : ''}
                                   userSize='tiny'/>
            </div>
          </DrawDuoDisplayBody>
          <DrawDuoDisplayFooter>
            {
              (this.isVoting()) ? (
                <CountdownTimer timerDuration={(votingDuration / 1000)}/>
              ) : (
                <footer className='DrawDuoDisplayEntryVoting__footer'>
                  <DrawDuoRevealAnswers/>
                </footer>
              )
            }
          </DrawDuoDisplayFooter>
        </DrawDuoDisplayWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
    votingDuration: getVotingTimer(session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryVoting);
