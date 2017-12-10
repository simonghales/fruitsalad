import React, {Component} from 'react';
import './DrawDuoDisplayEntryCompleted.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {DrawDuoModel, PairModel, UsersModel} from '../../logic/models';
import DrawDuoArtworkPiece from '../../components/DrawDuoArtworkPiece/DrawDuoArtworkPiece';
import DrawDuoPairsResults from '../../components/DrawDuoPairsResults/DrawDuoPairsResults';
import {getCurrentEntryPromptPair} from '../../logic/entries';
import {getPair, getPairs, getUsers} from '../../logic/users';

class DrawDuoDisplayEntryCompleted extends Component {

  props: {
    pair: PairModel,
    users: UsersModel,
    state: string,
    session: {
      drawDuo: DrawDuoModel,
    },
  };

  render() {
    const {pair, users} = this.props;
    return (
      <div className='DrawDuoDisplayEntryCompleted'>
        <div className='DrawDuoDisplayEntryCompleted__drawings'>
          {
            (pair) && Object.keys(pair).map((userKey) => (
              <DrawDuoArtworkPiece size='medium' userKey={userKey} user={users[userKey]}
                                   userSize='small' hideUser={true} key={userKey}/>
            ))
          }
        </div>
        <div className='DrawDuoDisplayEntryCompleted__users'>
          <DrawDuoPairsResults/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  const pairKey = getCurrentEntryPromptPair(session.drawDuo);
  const pairs = getPairs(session.drawDuo);
  const pair = getPair(pairKey, pairs);
  return {
    pair: pair,
    session: session,
    users: getUsers(session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayEntryCompleted);
