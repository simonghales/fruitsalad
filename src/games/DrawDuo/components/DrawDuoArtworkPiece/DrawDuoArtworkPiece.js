import React, {Component} from 'react';
import './DrawDuoArtworkPiece.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getUser, getUsers} from '../../logic/users';
import {UserModel, UsersModel} from '../../logic/models';

class DrawDuoArtworkPiece extends Component {

  props: {
    userKey: string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {userKey} = this.props;
    return (
      <div className='DrawDuoArtworkPiece'>
        <div className='DrawDuoArtworkPiece__drawing'></div>
        <div className='DrawDuoArtworkPiece__attribution'>
          <DrawDuoUser alignment='horizontal' size='medium' userKey={userKey} submittedDisplay={false}/>
        </div>
      </div>
    )
  }
}

export default DrawDuoArtworkPiece;