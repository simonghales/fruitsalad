import React, {Component} from 'react';
import './DrawDuoDisplayPendingUsers.css';
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
    console.log('users', users);
    return (
      <div className='DrawDuoDisplayPendingUsers'>
        {
          Object.keys(users).map((userKey) => (
            <DrawDuoSessionUser user={users[userKey]} key={userKey}/>
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
