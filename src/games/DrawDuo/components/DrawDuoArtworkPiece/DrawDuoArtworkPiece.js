import React, {Component} from 'react';
import './DrawDuoArtworkPiece.css';
import DrawDuoUser from '../DrawDuoUser/DrawDuoUser';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import {getUser, getUserDrawing, getUsers} from '../../logic/users';
import {DrawingModel, UserModel, UsersModel} from '../../logic/models';
import {firebaseConnect} from 'react-redux-firebase';

class DrawDuoArtworkPiece extends Component {

  props: {
    hideUser?: boolean,
    size?: string,
    userKey: string,
    userSize?: string,
    drawing: DrawingModel,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {hideUser = false, size = 'default', userKey, userSize = 'medium', drawing} = this.props;

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
          <DrawDuoUser alignment='horizontal' size={userSize} userKey={userKey} submittedDisplay={false}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState, props) => {
  const {firebase, userKey} = props;
  const session = state.firebase.data.session;
  return {
    drawing: getUserDrawing(userKey, session.drawDuo),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(DrawDuoArtworkPiece));
