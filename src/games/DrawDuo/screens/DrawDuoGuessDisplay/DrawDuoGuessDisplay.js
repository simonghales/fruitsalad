import React, {Component} from 'react';
import './DrawDuoGuessDisplay.css';
import {connect} from 'react-redux';
import {setCurrentScreen, setNotPending, setPending} from '../../../../redux/reducers/drawDuo/reducer';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';

class DrawDuoGuessDisplay extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoGuessDisplay'>
        <div className='DrawDuoGuessDisplay__content'>
          <div className='DrawDuoGuessDisplay__answers'>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 1</div>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 2</div>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 3</div>
          </div>
          <div className='DrawDuoGuessDisplay__drawingContainer'>
            <DrawDuoArtwork display={true}/>
            <div className='DrawDuoGuessDisplay__drawing__label'>
              Cast your vote from your phone
            </div>
          </div>
          <div className='DrawDuoGuessDisplay__answers'>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 4</div>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 5</div>
            <div className='DrawDuoGuessDisplay__answers__answer'>ANSWER 6</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScreen: (screen: string) => dispatch(setCurrentScreen(screen)),
    setNotPending: () => dispatch(setNotPending()),
    setPending: () => dispatch(setPending()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoGuessDisplay);
