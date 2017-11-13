import React, {Component} from 'react';
import './DrawDuoGuess.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';
import {setCurrentScreen, setNotPending, setPending} from '../../../../redux/reducers/drawDuo/reducer';
import {SCREEN_VOTE} from '../../constants';
import DrawDuoPending from '../DrawDuoPending/DrawDuoPending';
import {AppState} from '../../../../redux/index';

class DrawDuoGuess extends Component {

  props: {
    setCurrentScreen(screen: string): void,
    setNotPending(): void,
    setPending(): void,
  };

  constructor(props) {
    super(props);
    this.submitGuess = this.submitGuess.bind(this);
  }

  componentDidMount() {
    const {setNotPending} = this.props;
    setTimeout(() => {
      setNotPending();
    }, 1000);
  }

  submitGuess() {
    const {setCurrentScreen, setPending} = this.props;
    setPending();
    setCurrentScreen(SCREEN_VOTE);
  }

  render() {
    return (
      <DrawDuoPending title='Hang on a sec' subtitle='Watch the TV for instructions'>
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
      </DrawDuoPending>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScreen: (screen: string) => dispatch(setCurrentScreen(screen)),
    setNotPending: () => dispatch(setNotPending()),
    setPending: () => dispatch(setPending()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoGuess);
