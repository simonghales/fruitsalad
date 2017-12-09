import React, {Component} from 'react';
import './DrawDuoSessionUser.css';
import {SessionUserModel} from '../../logic/models';
import Player from '../../../../components/Player/Player';

class DrawDuoSessionUser extends Component {

  props: {
    user: SessionUserModel,
    size?: string,
  };

  render() {
    const {user, size} = this.props;
    return (
      <div className='DrawDuoSessionUser'>
        <Player player={user} size={size}/>
      </div>
    )
  }
}

export default DrawDuoSessionUser;
