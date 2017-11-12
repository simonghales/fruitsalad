import React, {Component} from 'react';
import './DrawDuoGuess.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';
import {setCurrentScreen} from '../../../../redux/reducers/drawDuo/reducer';
import {SCREEN_VOTE} from '../../constants';

class DrawDuoGuess extends Component {

  props: {
    setCurrentScreen(screen: string): void,
  };

  constructor(props) {
    super(props);
    this.submitGuess = this.submitGuess.bind(this);
  }

  submitGuess() {
    const {setCurrentScreen} = this.props;
    setCurrentScreen(SCREEN_VOTE);
  }

  render() {
    return (
      <div className='DrawDuoGuess'>
        <div className='DrawDuoGuess__content'>
          <DrawDuoArtwork/>
          <div className='DrawDuoGuess__input'>Enter your guess for what it is</div>
          <div className='DrawDuoGuess__options'>
            <ArtyButton onClick={this.submitGuess}>Submit answer</ArtyButton>
          </div>
          <div className='DrawDuoGuess__hint'>
            Points are gained by tricking others into voting for your answer
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScreen: (screen: string) => dispatch(setCurrentScreen(screen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoGuess);
