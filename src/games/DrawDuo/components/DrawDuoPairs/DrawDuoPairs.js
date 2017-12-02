import React, {Component} from 'react';
import './DrawDuoPairs.css';
import {connect} from 'react-redux';
import DrawDuoPair from '../DrawDuoPair/DrawDuoPair';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel} from '../../logic/models';
import {getPairs, getPairsArrays, WrappedPair} from '../../logic/users';
import {getDrawingTimer} from '../../logic/game';

class DrawDuoPairs extends Component {

  props: {
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  constructor(props) {
    super(props);
  }

  getTimerDuration() {
    const {session} = this.props;
    return getDrawingTimer(session.drawDuo) / 1000;
  }

  render() {
    const {session} = this.props;
    const pairs = getPairsArrays(session.drawDuo);
    // let rightPairs = getPairsArrays(session.drawDuo);
    // const leftPairs = rightPairs.splice(0, Math.ceil(rightPairs.length / 2));
    return (
      <div className='DrawDuoPairs'>
        <div className='DrawDuoPairs__row'>
          {
            pairs.map((pairKey: string, index) => (
              <DrawDuoPair pairKey={pairKey} key={pairKey}/>
            ))
          }
        </div>
        {/*<CountdownTimer timerDuration={this.getTimerDuration()}/>*/}
        {/*{*/}
        {/*rightPairs.map((pairKey: string, index) => (*/}
        {/*<DrawDuoPair pairKey={pairKey} key={pairKey}/>*/}
        {/*))*/}
        {/*}*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPairs);
