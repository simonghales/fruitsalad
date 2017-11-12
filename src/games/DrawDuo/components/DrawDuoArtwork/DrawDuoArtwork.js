import React, {Component} from 'react';
import './DrawDuoArtwork.css';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';

class DrawDuoArtwork extends Component {

  props: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoArtwork'>
        <div className='DrawDuoArtwork__users'>
          <UserImage size='small'/>
          <div className='DrawDuoArtwork__users__text'>&</div>
          <UserImage size='small'/>
          <div className='DrawDuoArtwork__users__label'>drew this</div>
        </div>
        <div className='DrawDuoArtwork__drawing'></div>
      </div>
    )
  }
}

export default DrawDuoArtwork;
