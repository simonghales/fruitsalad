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

  getRows(pairs) {
    const rowMaxSize = 4;
    return pairs.reduce((ar, it, i) => {
      const ix = Math.floor(i / rowMaxSize);
      if (!ar[ix]) {
        ar[ix] = [];
      }
      ar[ix].push(it);
      return ar;
    }, []);
  }

  render() {
    const {session} = this.props;
    const pairs = getPairsArrays(session.drawDuo);
    const rows = this.getRows(pairs);
    return (
      <div className='DrawDuoPairs'>
        {
          rows.map((row, index) => (
            <div className='DrawDuoPairs__row' key={index}>
              {
                row.map((pairKey: string) => (
                  <DrawDuoPair pairKey={pairKey} key={pairKey}/>
                ))
              }
            </div>
          ))
        }
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
