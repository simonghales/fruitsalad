import React, {Component} from 'react';
import './DrawDuoUser.css';
import classNames from 'classnames';
import {AppState} from '../../../../redux/index';
import {connect} from 'react-redux';
import {getUser, getUsers, hasUserSubmittedDrawing} from '../../logic/users';
import {SessionModel, UserModel, UsersModel} from '../../logic/models';

class DrawDuoUser extends Component {

  props: {
    userKey: string,
    users: UsersModel,
    session: SessionModel,
  };

  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  render() {
    const {userKey, users, session} = this.props;
    const user: UserModel = getUser(userKey, users);
    const userHasSubmitted = hasUserSubmittedDrawing(userKey, session.drawDuo);
    return (
      <div className={classNames([
        'DrawDuoUser',
        {
          'DrawDuoUser--submitted': userHasSubmitted,
          'DrawDuoUser--notSubmitted': !userHasSubmitted,
        }
      ])}>
        <div className='DrawDuoUser__image'>
          <div className='DrawDuoUser__submitted'>Submitted</div>
        </div>
        <div className='DrawDuoUser__label'>
          <span>{user.name}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    users: getUsers(session.drawDuo),
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoUser);