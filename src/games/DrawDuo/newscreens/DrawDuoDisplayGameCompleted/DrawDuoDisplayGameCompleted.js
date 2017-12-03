import React, {Component} from 'react';
import './DrawDuoDisplayGameCompleted.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel} from '../../logic/models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';

class DrawDuoDisplayGameCompleted extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    const {session} = this.props;
    return (
      <div className='DrawDuoDisplayGameCompleted'>
        <div className='DrawDuoDisplayGameCompleted__info'>
          <h2 className='DrawDuoDisplayGameCompleted__title'>Game Completed</h2>
        </div>
        <div className='DrawDuoDisplayGameCompleted__content'>
          <div className='DrawDuoDisplayGameCompleted__pairs'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayGameCompleted);
