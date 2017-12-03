import React, {Component} from 'react';
import './DrawDuoDisplayEntryGuessing.css';
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

class DrawDuoDisplayEntryGuessing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    const {session} = this.props;
    const currentPairKey = getCurrentPairKey(session.drawDuo);
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
          <DrawDuoUserGuessesIndicators/>
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
