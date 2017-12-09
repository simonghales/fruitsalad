import React, {Component} from 'react';
import './DrawDuoDisplayDrawing.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import Heading from '../../../../components/Heading/Heading';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';

class DrawDuoDisplayDrawing extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  getDrawingTimer() {
    return 60;
  }

  render() {
    return (
      <div className='DrawDuoDisplayDrawing'>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <div className='DrawDuoDisplayDrawing__header'>
              <div className='DrawDuoDisplayDrawing__header__title'>
                <Heading>get drawing!</Heading>
              </div>
              <div className='DrawDuoDisplayDrawing__header__subtitle'>
                <Heading size='small'>
                  <JumpingLetters label={`check your device for your prompt`} intensity='less'/>
                </Heading>
              </div>
            </div>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody>
            <div className='DrawDuoDisplayDrawing__content'>
              <div className='DrawDuoDisplayDrawing__pairs'>
                <DrawDuoPairs sort='score' disabled='drawing'/>
              </div>
            </div>
          </DrawDuoDisplayBody>
        </DrawDuoDisplayWrapper>
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
