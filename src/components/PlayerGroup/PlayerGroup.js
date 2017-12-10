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
    action?: string,
    disabledUsers?: string[],
    layout?: string,
    pairKey: string,
    pair: PairModel,
    playerSize?: string,
    users: UsersModel,
    playerAside(): any,
    playerProps?: {},
    getAction(): string,
  };

  render() {

    const {
      action, getAction, disabledUsers = [], layout = 'horizontal',
      pair, playerAside = null, playerSize = 'small', playerProps = {}, users
    } = this.props;
    return (
      <div className={classNames([
        'PlayerGroup',
        `PlayerGroup--layout-${layout}`
      ])}>
        {
          Object.keys(pair).map((playerKey, index) => {
            const disabled = disabledUsers.includes(playerKey);
            const displayAction = (action) ? action : (getAction) ? getAction() : (disabled) ? 'DRAWING' : 'DONE';
            return (
              <div className={classNames([
                'PlayerGroup__player',
                {
                  'PlayerGroup__player--asideIncluded': (playerAside),
                }
              ])} key={playerKey}>
                <Player disabled={disabled} player={users[playerKey]} action={displayAction} showAction={true}
                        showName={true}
                        key={index} size={playerSize} {...playerProps}/>
                {playerAside && playerAside(playerKey)}
              </div>
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
