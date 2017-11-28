import React, {Component} from 'react';
import './DrawDuoDisplayDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';

class DrawDuoDisplayDrawing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  getDrawingTimer() {
    const {session} = this.props;
    return session.drawDuo.drawingTimer / 1000;
  }

  render() {
    return (
      <div className='DrawDuoDisplayDrawing'>
        <div className='DrawDuoDisplayDrawing__content'>
          <CountdownTimer timerDuration={this.getDrawingTimer()}/>
          <div className='DrawDuoDisplayDrawing__label'>
            Check your device for your prompt and get drawing!
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayDrawing);
