import React, {Component} from 'react';
import './DrawDuoPairSlots.css';
import classNames from 'classnames';
import DrawDuoArtworkPiece from '../DrawDuoArtworkPiece/DrawDuoArtworkPiece';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import {connect} from 'react-redux';
import {getPair, getPairs, getPairUsersKeys, getUser, getUsers, hasUserSubmittedAnswer} from '../../logic/users';
import {AppState} from '../../../../redux/index';
import {PairsModel, SessionModel, UserModel, UsersModel} from '../../logic/models';

class DrawDuoPairSlots extends Component {

  props: {
    pairKey: string,
    pairs: PairsModel,
    users: UsersModel,
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  getUser(userKey: string) {
    const {users, session} = this.props;
    const user: UserModel = getUser(userKey, users);
    const userHasSubmitted = hasUserSubmittedAnswer(userKey, session.drawDuo);
    return (
      <div className={classNames([
        'DrawDuoPairSlots__slot',
        {
          'DrawDuoPairSlots__slot--submitted': userHasSubmitted,
        }
      ])} key={userKey}>
        <div className='DrawDuoPairSlots__slot__user'></div>
      </div>
    );
  }

  render() {
    const {pairKey, pairs} = this.props;
    const pair = getPair(pairKey, pairs);
    const usersKeys = getPairUsersKeys(pair);
    return (
      <div className='DrawDuoPairSlots'>
        {
          usersKeys.map((userKey) => this.getUser(userKey))
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    pairs: getPairs(session.drawDuo),
    users: getUsers(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoPairSlots);