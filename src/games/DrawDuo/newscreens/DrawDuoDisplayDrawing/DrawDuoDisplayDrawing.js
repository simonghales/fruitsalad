import React, {Component} from 'react';
import './DrawDuoDisplayDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';

class DrawDuoDisplayDrawing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoGame,
    },
  };

  getDrawingTimer() {
    return 60;
  }

  render() {
    return (
      <div className='DrawDuoDisplayDrawing'>
        <div className='DrawDuoDisplayDrawing__content'>
          <div className='DrawDuoDisplayDrawing__info'>
            <CountdownTimer timerDuration={this.getDrawingTimer()}/>
            <div className='DrawDuoDisplayDrawing__label'>
              Check your device for your prompt and get drawing!
            </div>
          </div>
          <div className='DrawDuoDisplayDrawing__pairs'>
            <DrawDuoPairs/>
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
