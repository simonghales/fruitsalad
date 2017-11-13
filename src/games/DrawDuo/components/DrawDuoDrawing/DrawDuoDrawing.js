import React, {Component} from 'react';
import './DrawDuoDrawing.css';
import {connect} from 'react-redux';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import {setCurrentScreen, setNotPending, setPending} from '../../../../redux/reducers/drawDuo/reducer';
import {AppState} from '../../../../redux/index';
import {SCREEN_GUESS} from '../../constants';
import DrawDuoPending from '../DrawDuoPending/DrawDuoPending';

class DrawDuoDrawing extends Component {

  props: {
    setCurrentScreen(screen: string): void,
    setNotPending(): void,
    setPending(): void,
  };

  constructor(props) {
    super(props);
    this.submitDrawing = this.submitDrawing.bind(this);
  }

  componentDidMount() {
    const {setNotPending} = this.props;
    setTimeout(() => {
      setNotPending();
    }, 1000);
  }

  submitDrawing() {
    const {setCurrentScreen, setPending} = this.props;
    setPending();
    setCurrentScreen(SCREEN_GUESS);
  }

  render() {
    return (
      <DrawDuoPending title='Hang on a sec' subtitle='Watch the TV for instructions'>
        <div className='DrawDuoDrawing'>
          <div className='DrawDuoDrawing__prompt'>
            <div>Draw <span>a rabbit driving a car</span></div>
          </div>
          <div className='DrawDuoDrawing__drawing'>

          </div>
          <div className='DrawDuoDrawing__options'>
            <ArtyButton onClick={this.submitDrawing}>Submit drawing</ArtyButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDrawing);
