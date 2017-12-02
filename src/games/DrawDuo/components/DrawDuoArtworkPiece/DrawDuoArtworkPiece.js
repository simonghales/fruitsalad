import React, {Component} from 'react';
import './DrawDuoArtworkPiece.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getUser, getUsers} from '../../logic/users';
import {UserModel, UsersModel} from '../../logic/models';

class DrawDuoArtworkPiece extends Component {

  props: {
    hideUser?: boolean,
    size?: string,
    userKey: string,
    userSize?: string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {hideUser = false, size = 'default', userKey, userSize = 'medium'} = this.props;
    return (
      <div className={classNames([
        'DrawDuoArtworkPiece',
        `DrawDuoArtworkPiece--size-${size}`,
        {
          'DrawDuoArtworkPiece--hideUser': hideUser,
        }
      ])}>
        <div className='DrawDuoArtworkPiece__drawing'></div>
        <div className='DrawDuoArtworkPiece__attribution'>
          <DrawDuoUser alignment='horizontal' size={userSize} userKey={userKey} submittedDisplay={false}/>
        </div>
      </div>
    )
  }
}

export default DrawDuoArtworkPiece;