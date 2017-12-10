import React, {Component} from 'react';
import './DrawDuoPairsResults.css';
import {connect} from 'react-redux';
import DrawDuoPair from '../DrawDuoPair/DrawDuoPair';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {AppState} from '../../../../redux/index';
import {AnswerModel, DrawDuoModel, PairsModel} from '../../logic/models';
import {getPairs, getPairsArrays, getUserAnswer, WrappedPair} from '../../logic/users';
import {getDrawingTimer} from '../../logic/game';
import PlayerGroup from '../../../../components/PlayerGroup/PlayerGroup';

class DrawDuoPairsResults extends Component {

  props: {
    pairs: PairsModel,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  constructor(props) {
    super(props);
    this.getPlayerAside = this.getPlayerAside.bind(this);
  }

  getTimerDuration() {
    const {session} = this.props;
    return getDrawingTimer(session.drawDuo) / 1000;
  }

  getRows(pairs) {
    const rowMaxSize = 3;
    return pairs.reduce((ar, it, i) => {
      const ix = Math.floor(i / rowMaxSize);
      if (!ar[ix]) {
        ar[ix] = [];
      }
      ar[ix].push(it);
      return ar;
    }, []);
  }

  getPlayerAside(userKey: string) {
    const {session} = this.props;
    const answer: AnswerModel = getUserAnswer(userKey, session.drawDuo);
    return (
      <div className='DrawDuoPairsResults__playerAside'>
        <div className='DrawDuoPairsResults__playerAside__text'>
          <span>
            {answer && answer.text}
          </span>
        </div>
      </div>
    )
  }

  render() {
    const {pairs, session} = this.props;
    const pairsArray = getPairsArrays(session.drawDuo);
    const rows = this.getRows(pairsArray);
    return (
      <div className='DrawDuoPairsResults'>
        {
          rows.map((row, index) => (
            <div className='DrawDuoPairsResults__row' key={index}>
              {
                row.map((pairKey: string) => (
                  <PlayerGroup action='+1000' layout='vertical' pair={pairs[pairKey]} playerSize='mini'
                               users={{}} key={pairKey} pairKey={pairKey} playerAside={this.getPlayerAside}
                               playerProps={{
                                 pointsSize: 'large',
                               }}/>
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
    pairs: getPairs(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPairsResults);
