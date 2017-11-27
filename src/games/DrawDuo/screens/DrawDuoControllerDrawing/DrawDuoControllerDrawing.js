import React, {Component} from 'react';
import './DrawDuoControllerDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';

class DrawDuoControllerDrawing extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerDrawing'>
        <div className='DrawDuoControllerDrawing__content'>
          <h3 className='DrawDuoControllerDrawing__title'>
            draw this
          </h3>
          <div className='DrawDuoControllerDrawing__prompt'>a couple of musical dogs</div>
          <div className='DrawDuoControllerDrawing__drawingContainer'></div>
          <div className='DrawDuoControllerDrawing__buttonWrapper'>
            <ArtyButton onClick={() => {}}>Submit</ArtyButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerDrawing);
