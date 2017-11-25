import React, {Component} from 'react';
import './DrawDuoDisplayInitiating.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';

class DrawDuoDisplayInitiating extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoDisplayInitiating'>
        <div className='DrawDuoDisplayInitiating__content'>
          <div>INITIATING HOLD ON TIGHT</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayInitiating);
