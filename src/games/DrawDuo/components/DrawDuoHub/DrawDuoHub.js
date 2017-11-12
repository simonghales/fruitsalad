import React, {Component} from 'react';
import './DrawDuoHub.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import DrawDuoDrawing from '../DrawDuoDrawing/DrawDuoDrawing';
import DrawDuoGuess from '../DrawDuoGuess/DrawDuoGuess';
import DrawDuoVote from '../DrawDuoVote/DrawDuoVote';
import {AppState} from '../../../../redux/index';
import {getCurrentScreen} from '../../../../redux/reducers/drawDuo/state';
import {getComponentFromCurrentScreen} from '../../config';

class DrawDuoHub extends Component {

  props: {
    currentScreen: string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {currentScreen} = this.props;
    return (
      <div className='DrawDuoHub'>
        {
          getComponentFromCurrentScreen(currentScreen)
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentScreen: getCurrentScreen(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoHub);
