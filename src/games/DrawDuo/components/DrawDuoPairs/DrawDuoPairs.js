import React, {Component} from 'react';
import './DrawDuoPairs.css';
import {connect} from 'react-redux';
import DrawDuoPair from '../DrawDuoPair/DrawDuoPair';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel, PairsModel} from '../../logic/models';
import {
  getPairs, getPairsArrays, getPairsArraysSortedByScore, getUsersWithoutDrawings,
  WrappedPair
} from '../../logic/users';
import {getDrawingTimer} from '../../logic/game';
import PlayerGroup from '../../../../components/PlayerGroup/PlayerGroup';

class DrawDuoPairs extends Component {

  props: {
    disabled?: 'drawing',
    pairs: PairsModel,
    session: {
      drawDuo: DrawDuoModel,
    },
    sort?: 'score',
    userProps?: {},
    usersWithoutDrawings: string[],
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
    const {disabled, pairs, session, sort, usersWithoutDrawings, userProps} = this.props;
    const sortedPairs = (sort && sort === 'score') ? getPairsArraysSortedByScore(session.drawDuo) : getPairsArrays(session.drawDuo);
    const rows = this.getRows(sortedPairs);
    const disabledUsers = (disabled && disabled === 'drawing') ? usersWithoutDrawings : [];
    console.log('disabledUsers', disabledUsers);
    return (
      <div className='DrawDuoPairs'>
        {
          rows.map((row, index) => (
            <div className='DrawDuoPairs__row' key={index}>
              {
                row.map((pairKey: string) => (
                  <PlayerGroup disabledUsers={disabledUsers} pairKey={pairKey} pair={pairs[pairKey]} key={pairKey}/>
                ))
              }
              {/*<DrawDuoPair pairKey={pairKey} key={pairKey} userProps={userProps}/>*/}
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  const usersWithoutDrawings = getUsersWithoutDrawings(session.drawDuo);
  return {
    pairs: getPairs(session.drawDuo),
    session: session,
    usersWithoutDrawings: usersWithoutDrawings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPairs);
