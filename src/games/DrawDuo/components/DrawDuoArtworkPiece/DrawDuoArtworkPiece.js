import React, {Component} from 'react';
import './DrawDuoArtworkPiece.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getUser, getUserDrawing, getUsers} from '../../logic/users';
import {DrawingModel, UserModel, UsersModel} from '../../logic/models';
import {firebaseConnect} from 'react-redux-firebase';
import Player from '../../../../components/Player/Player';

class DrawDuoArtworkPiece extends Component {

  props: {
    hideUser?: boolean,
    size?: string,
    user: UserModel,
    userKey: string,
    userSize?: string,
    drawing: DrawingModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {hideUser = false, size = 'default', userSize = 'small', user, drawing} = this.props;

    const drawingStyle = (drawing) ? {
      backgroundImage: `url(${drawing.image})`
    } : {};

    return (
      <div className={classNames([
        'DrawDuoArtworkPiece',
        `DrawDuoArtworkPiece--size-${size}`,
        {
          'DrawDuoArtworkPiece--hideUser': hideUser,
        }
      ])}>
        <div className='DrawDuoArtworkPiece__drawing' style={drawingStyle}></div>
        <div className='DrawDuoArtworkPiece__attribution'>
          {
            user && (
              <Player player={user} size={userSize}/>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState, props) => {
  const {userKey} = props;
  const session = state.firebase.data.session;
  const users = getUsers(session.drawDuo);
  return {
    drawing: getUserDrawing(userKey, session.drawDuo),
    user: getUser(userKey, users),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(DrawDuoArtworkPiece));
