import React, {Component} from 'react';
import './DrawDuoDisplayRoundResults.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import DrawDuoDisplayWrapper from '../../components/DrawDuoDisplayWrapper/DrawDuoDisplayWrapper';
import DrawDuoDisplayHeader from '../../components/DrawDuoDisplayHeader/DrawDuoDisplayHeader';
import DrawDuoDisplayBody from '../../components/DrawDuoDisplayBody/DrawDuoDisplayBody';
import Heading from '../../../../components/Heading/Heading';
import JumpingLetters from '../../../../components/JumpingLetters/JumpingLetters';

class DrawDuoDisplayRoundResults extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    const {session} = this.props;
    return (
      <div className='DrawDuoDisplayRoundResults'>
        <DrawDuoDisplayWrapper>
          <DrawDuoDisplayHeader>
            <header className='DrawDuoDisplayRoundResults__header'>
              <div className='DrawDuoDisplayRoundResults__header__title'>
                <Heading>scoreboard</Heading>
              </div>
              <div className='DrawDuoDisplayRoundResults__header__subtitle'>
                <Heading size='small'>
                  <JumpingLetters label={`final round to go`} intensity='less'/>
                </Heading>
              </div>
            </header>
          </DrawDuoDisplayHeader>
          <DrawDuoDisplayBody>
            <div className='DrawDuoDisplayRoundResults__content'>
              <div className='DrawDuoDisplayRoundResults__pairs'>
                <DrawDuoPairs userProps={{
                  pointsDisplay: 'total',
                  submittedDisplay: false,
                }} sort='score'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayRoundResults);
