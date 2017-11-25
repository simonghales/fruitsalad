import React, {Component} from 'react';
import './DrawDuoDisplayDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';

class DrawDuoDisplayDrawing extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoDisplayDrawing'>
        <div className='DrawDuoDisplayDrawing__content'>
          <CountdownTimer timerDuration={60}/>
          <div className='DrawDuoDisplayDrawing__label'>
            Check your device for your prompt and get drawing!
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayDrawing);
