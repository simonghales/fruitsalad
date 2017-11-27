import React, {Component} from 'react';
import './DrawDuoControllerInitiating.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoCenteredMessage from '../../components/DrawDuoCenteredMessage/DrawDuoCenteredMessage';

class DrawDuoControllerResults extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerResults'>
        <DrawDuoCenteredMessage>
          Watch the TV for the results
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerResults);
