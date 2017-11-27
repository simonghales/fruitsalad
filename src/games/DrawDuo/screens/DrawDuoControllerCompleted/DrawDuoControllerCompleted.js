import React, {Component} from 'react';
import './DrawDuoControllerCompleted.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoCenteredMessage from '../../components/DrawDuoCenteredMessage/DrawDuoCenteredMessage';

class DrawDuoControllerCompleted extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerCompleted'>
        <DrawDuoCenteredMessage>
          Game Completed
        </DrawDuoCenteredMessage>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerCompleted);
