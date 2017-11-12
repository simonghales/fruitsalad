import React, {Component} from 'react';
import './DrawDuoGuess.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';

class DrawDuoGuess extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoGuess'>
        <div className='DrawDuoGuess__content'>
          <DrawDuoArtwork/>
          <div className='DrawDuoGuess__input'>Enter your guess for what it is</div>
          <div className='DrawDuoGuess__options'>
            <ArtyButton>Submit answer</ArtyButton>
          </div>
          <div className='DrawDuoGuess__hint'>
            Points are gained by tricking others into voting for your answer
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoGuess);
