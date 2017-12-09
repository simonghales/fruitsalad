import React, {Component} from 'react';
import './DrawDuoDisplayPendingUsers.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {SessionUsersModel} from '../../logic/models';
import DrawDuoSessionUser from '../../components/DrawDuoSessionUser/DrawDuoSessionUser';

class DrawDuoDisplayPendingUsers extends Component {

  props: {
    users: SessionUsersModel,
  };

  render() {
    const {users} = this.props;
    const usersList = Object.keys(users);
    const smallSize = (usersList.length > 6);
    const userSize = (smallSize) ? 'small' : 'default';
    return (
      <div className={classNames([
        'DrawDuoDisplayPendingUsers',
        `DrawDuoDisplayPendingUsers--count-${usersList.length}`,
        {
          'DrawDuoDisplayPendingUsers--largeCount': smallSize,
        }
      ])}>
        {
          usersList.map((userKey) => (
            <DrawDuoSessionUser user={users[userKey]} key={userKey} size={userSize}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  const users = (session && session.users) ? session.users : {};
  return {
    users: users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayPendingUsers);
