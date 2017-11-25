import React, {Component} from 'react';
import './DrawDuoDisplayCompleted.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';

class DrawDuoDisplayCompleted extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoDisplayCompleted'>
        <div className='DrawDuoDisplayCompleted__content'>
          <div>GAME COMPLETED</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayCompleted);
