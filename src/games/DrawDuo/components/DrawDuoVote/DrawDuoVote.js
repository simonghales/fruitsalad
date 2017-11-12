import React, {Component} from 'react';
import './DrawDuoVote.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';
import ChoiceButton from '../../../../components/ChoiceButton/ChoiceButton';

class DrawDuoVote extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoVote'>
        <div className='DrawDuoGuess__content'>
          <DrawDuoArtwork/>
          <div className='DrawDuoVote__prompt'>Select an answer</div>
          <div className='DrawDuoVote__answers'>
            {
              Array.from({length: 6}).map((item, index) => (
                <div className='DrawDuoVote__answer' key={index}>
                  <ChoiceButton fullWidth={true}>
                    Answer {index + 1}
                  </ChoiceButton>
                </div>
              ))
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoVote);
