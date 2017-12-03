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

class DrawDuoDisplayEntryGuessing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getIndicatorsAlignment(pair: PairModel): string {
    const users = Object.keys(pair);
    return (users.length === 2) ? 'center' : 'right';
  }

  render() {
    const {session} = this.props;
    const currentPairKey = getCurrentPairKey(session.drawDuo);
    const pair = getPairByKey(currentPairKey, session.drawDuo);
    return (
      <div className='DrawDuoDisplayEntryGuessing'>
        <header className='DrawDuoDisplayEntryGuessing__header'>
          <div className='DrawDuoDisplayEntryGuessing__header__content'>
            <DrawDuoTitle>Describe the drawings!</DrawDuoTitle>
            <DrawDuoAnimatedMessage label='Answer via your device'/>
          </div>
        </header>
        <div className='DrawDuoDisplayEntryGuessing__content'>
          <DrawDuoArtworks pairKey={currentPairKey}/>
          <DrawDuoUserGuessesIndicators alignment={this.getIndicatorsAlignment(pair)}/>
        </div>
        <footer className='DrawDuoDisplayEntryGuessing__footer'></footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryGuessing);
