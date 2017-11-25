import React, {Component} from 'react';
import './DrawDuoDisplayGuess.css';
import {connect} from 'react-redux';
import {setCurrentScreen, setNotPending, setPending} from '../../../../redux/reducers/drawDuo/reducer';
import {AppState} from '../../../../redux/index';
import DrawDuoArtwork from '../../components/DrawDuoArtwork/DrawDuoArtwork';

class DrawDuoDisplayGuess extends Component {

  props: {};

  render() {
    return (
      <div className='DrawDuoDisplayGuess'>
        <div className='DrawDuoDisplayGuess__content'>
          <div className='DrawDuoDisplayGuess__answers'>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 1</div>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 2</div>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 3</div>
          </div>
          <div className='DrawDuoDisplayGuess__drawingContainer'>
            <DrawDuoArtwork display={true}/>
            <div className='DrawDuoDisplayGuess__drawing__label'>
              Cast your vote from your phone
            </div>
          </div>
          <div className='DrawDuoDisplayGuess__answers'>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 4</div>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 5</div>
            <div className='DrawDuoDisplayGuess__answers__answer'>ANSWER 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayGuess);
