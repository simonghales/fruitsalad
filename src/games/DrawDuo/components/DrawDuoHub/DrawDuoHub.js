import React, {Component} from 'react';
import './DrawDuoHub.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import DrawDuoDrawing from '../DrawDuoDrawing/DrawDuoDrawing';
import DrawDuoGuess from '../DrawDuoGuess/DrawDuoGuess';
import DrawDuoVote from '../DrawDuoVote/DrawDuoVote';

class DrawDuoHub extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoHub'>
        {/*<DrawDuoDrawing/>*/}
        {/*<DrawDuoGuess/>*/}
        <DrawDuoVote/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoHub);
