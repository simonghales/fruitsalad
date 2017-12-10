import React, {Component} from 'react';
import './DrawDuoControllerPending.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoCenteredMessage from '../../components/DrawDuoCenteredMessage/DrawDuoCenteredMessage';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';

class DrawDuoControllerPending extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerPending'>
        <FullScreenLoadingMessage subtitle='watch the TV' subtitleSize='small'/>
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
