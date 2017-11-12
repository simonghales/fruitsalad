import React, {Component} from 'react';
import './DrawDuoDrawing.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';

class DrawDuoDrawing extends Component {

  props: {};

  constructor(props) {
    super(props);
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
          <ArtyButton>Submit drawing</ArtyButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDrawing);
