import React, {Component} from 'react';
import './DrawDuoDrawing.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import {AppState} from '../../../../redux/index';
import {setCurrentScreen} from '../../../../redux/reducers/drawDuo/reducer';

class DrawDuoDrawing extends Component {

  props: {};

  constructor(props) {
    super(props);
    this.submitDrawing = this.submitDrawing.bind(this);
  }

  submitDrawing() {

  }

  render() {
    return (
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
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setCurrentScreen: (screen: string) => dispatch(setCurrentScreen(screen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDrawing);
