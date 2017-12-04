import React, {Component} from 'react';
import './DrawDuoControllerPending.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoCenteredMessage from '../../components/DrawDuoCenteredMessage/DrawDuoCenteredMessage';

class DrawDuoControllerPending extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerPending'>
        <DrawDuoCenteredMessage>
          Watch the TV
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerPending);
