import React, {Component} from 'react';
import './DrawDuoControllerResults.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';

class DrawDuoControllerResults extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoControllerResults'>
        <FullScreenLoadingMessage title='results' subtitle='watch the TV' subtitleSize='small'/>
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
