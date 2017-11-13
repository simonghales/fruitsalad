import React, {Component} from 'react';
import './DrawDuoVote.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';
import DrawDuoArtwork from '../DrawDuoArtwork/DrawDuoArtwork';
import ChoiceButton from '../../../../components/ChoiceButton/ChoiceButton';
import DrawDuoPending from '../DrawDuoPending/DrawDuoPending';
import {AppState} from '../../../../redux/index';
import {setCurrentScreen, setNotPending, setPending} from '../../../../redux/reducers/drawDuo/reducer';
import {SCREEN_RESULTS} from '../../constants';

class DrawDuoVote extends Component {

  props: {
    setCurrentScreen(screen: string): void,
    setNotPending(): void,
    setPending(): void,
  };

  constructor(props) {
    super(props);
    this.selectChoice = this.selectChoice.bind(this);
  }

  componentDidMount() {
    const {setNotPending} = this.props;
    setTimeout(() => {
      setNotPending();
    }, 1000);
  }

  selectChoice() {
    const {setCurrentScreen} = this.props;
    setCurrentScreen(SCREEN_RESULTS);
  }

  render() {
    return (
      <DrawDuoPending title='Hang on a sec' subtitle='Watch the TV for instructions'>
        <div className='DrawDuoVote'>
          <div className='DrawDuoVote__content'>
            <DrawDuoArtwork/>
            <div className='DrawDuoVote__prompt'>Select an answer</div>
            <div className='DrawDuoVote__answers'>
              {
                Array.from({length: 6}).map((item, index) => (
                  <div className='DrawDuoVote__answer' key={index}>
                    <ChoiceButton fullWidth={true} onClick={this.selectChoice}>
                      Answer {index + 1}
                    </ChoiceButton>
                  </div>
                ))
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoVote);
