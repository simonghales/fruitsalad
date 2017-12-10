import React, {Component} from 'react';
import './DrawDuoDisplayEntryGuessing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import {DrawDuoModel, PairModel} from '../../logic/models';
import DrawDuoArtworks from '../../components/DrawDuoArtworks/DrawDuoArtworks';
import DrawDuoTitle from '../../components/DrawDuoTitle/DrawDuoTitle';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import DrawDuoUserGuessesIndicators from '../../components/DrawDuoUserGuessesIndicators/DrawDuoUserGuessesIndicators';
import {getCurrentPairKey, getPairByKey} from '../../logic/users';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';
import Heading from '../../../../components/Heading/Heading';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import DrawDuoDisplayFooter from '../../components/DrawDuoDisplayFooter/DrawDuoDisplayFooter';
import {getDrawingTimer, getGuessingTimer} from '../../logic/game';

class DrawDuoDisplayEntryGuessing extends Component {

  props: {
    guessingDuration: number,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getIndicatorsAlignment(pair: PairModel): string {
    const users = Object.keys(pair);
    return (users.length === 2) ? 'center' : 'right';
  }

  render() {
    const {guessingDuration, session} = this.props;
    const currentPairKey = getCurrentPairKey(session.drawDuo);
    const pair = getPairByKey(currentPairKey, session.drawDuo);
    return (
      <div className='DrawDuoDisplayEntryGuessing'>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <header className='DrawDuoDisplayEntryGuessing__header'>
              <div className='DrawDuoDisplayEntryGuessing__header__title'>
                <Heading>describe the drawings!</Heading>
              </div>
              <div className='DrawDuoDisplayEntryGuessing__header__subtitle'>
                <Heading size='small'>
                  <JumpingLetters label={`answer via your device`} intensity='less'/>
                </Heading>
              </div>
            </header>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody>
            <div className='DrawDuoDisplayEntryGuessing__content'>
              <DrawDuoArtworks pairKey={currentPairKey}/>
              <DrawDuoUserGuessesIndicators alignment={this.getIndicatorsAlignment(pair)}/>
            </div>
          </DrawDuoDisplayBody>
          <DrawDuoDisplayFooter>
            <CountdownTimer timerDuration={(guessingDuration / 1000)}/>
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
    guessingDuration: getGuessingTimer(session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryGuessing);
