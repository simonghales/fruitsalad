import React, {Component} from 'react';
import './DrawDuoDisplayDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import {DrawDuoModel} from '../../logic/models';

class DrawDuoDisplayDrawing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getDrawingTimer() {
    return 60;
  }

  getLabel() {
    const label = 'Check your device for your prompt';
    return label.split(' ').map((word: string, index) => (
      <span key={index}>{word}</span>
    ))
  }

  render() {
    return (
      <div className='DrawDuoDisplayDrawing'>
        <div className='DrawDuoDisplayDrawing__content'>
          <div className='DrawDuoDisplayDrawing__info'>
            <h2 className='DrawDuoDisplayDrawing__title'>Get Drawing!</h2>
            <div className='DrawDuoDisplayDrawing__label'>{this.getLabel()}</div>
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
