import React, {Component} from 'react';
import './DrawDuoArtwork.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {SessionState} from '../../../../redux/reducers/session/reducer';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import UserImage from '../../../../components/UserImage/UserImage';

class DrawDuoArtwork extends Component {

  props: {
    display: boolean,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {display} = this.props;
    return (
      <div className={classNames([
        'DrawDuoArtwork',
        {
          'DrawDuoArtwork--display': display,
        }
      ])}>
        <div className='DrawDuoArtwork__users'>
          <UserImage size='small'/>
          <div className='DrawDuoArtwork__users__text'>&</div>
          <UserImage size='small'/>
          <div className='DrawDuoArtwork__users__label'>drew these...</div>
        </div>
        <div className='DrawDuoArtwork__drawings'>
          <div className='DrawDuoArtwork__drawing'></div>
          <div className='DrawDuoArtwork__drawing'></div>
        </div>
      </div>
    )
  }
}

export default DrawDuoArtwork;
