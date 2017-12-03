import React, {Component} from 'react';
import './DrawDuoDisplayRoundResults.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';

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
        <div className='DrawDuoDisplayRoundResults__info'>
          <h2 className='DrawDuoDisplayRoundResults__title'>Scoreboard</h2>
          <DrawDuoAnimatedMessage label='Final round to go'/>
        </div>
        <div className='DrawDuoDisplayRoundResults__content'>
          <div className='DrawDuoDisplayRoundResults__pairs'>
            <DrawDuoPairs userProps={{
              pointsDisplay: 'total',
              submittedDisplay: false,
            }} sort='score'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayRoundResults);
