import React, {Component} from 'react';
import './DrawDuoSessionUser.css';
import {SessionUserModel} from '../../logic/models';

class DrawDuoSessionUser extends Component {

  props: {
    user: SessionUserModel,
  };

  render() {
    const {user} = this.props;
    return (
      <div className='DrawDuoSessionUser'>
        <div className='DrawDuoSessionUser__image'></div>
        <div className='DrawDuoSessionUser__label'>
          <span>
          {user.name}
          </span>
        </div>
      </div>
    )
  }
}

export default DrawDuoSessionUser;
