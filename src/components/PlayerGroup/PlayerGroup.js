import React, {Component} from 'react';
import './PlayerGroup.css';
import classNames from 'classnames';
import {PairModel, UsersModel} from '../../games/DrawDuo/logic/models';
import Player from '../Player/Player';
import {getUsers} from '../../games/DrawDuo/logic/users';
import {AppState} from '../../redux/index';
import {connect} from 'react-redux';

class PlayerGroup extends Component {

  props: {
    disabledUsers?: string[],
    pairKey: string,
    pair: PairModel,
    users: UsersModel,
  };

  render() {

    const {disabledUsers = [], pair, users} = this.props;
    return (
      <div className='PlayerGroup'>
        {
          Object.keys(pair).map((playerKey, index) => {
            const disabled = disabledUsers.includes(playerKey);
            const action = (disabled) ? 'DRAWING' : 'DONE';
            return (
              <Player disabled={disabled} player={users[playerKey]} action={action} showAction={true} showName={true}
                      key={index} size='small'/>
            )
          })
        }
      </div>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    users: getUsers(session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerGroup);
