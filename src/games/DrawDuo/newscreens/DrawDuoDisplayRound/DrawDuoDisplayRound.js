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

class DrawDuoDisplayRound extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    return (
      <div className='DrawDuoDisplayRound'>
        <header className='DrawDuoDisplayRound__header'>
          <div className='DrawDuoDisplayRound__header__content'>
            <DrawDuoTitle>Describe the drawings!</DrawDuoTitle>
            <DrawDuoAnimatedMessage label='Answer via your device'/>
          </div>
        </header>
        <div className='DrawDuoDisplayRound__content'>
          <DrawDuoArtworks/>
          <DrawDuoUserGuessesIndicators/>
        </div>
        <footer className='DrawDuoDisplayRound__footer'></footer>
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
