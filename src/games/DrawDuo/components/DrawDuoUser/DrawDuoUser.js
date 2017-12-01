import React, {Component} from 'react';
import './DrawDuoUser.css';
import classNames from 'classnames';

class DrawDuoUser extends Component {

  props: {
    userKey: string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames([
        'DrawDuoUser',
        {
          'DrawDuoUser--submitted': false,
          'DrawDuoUser--notSubmitted': true,
        }
      ])}>
        <div className='DrawDuoUser__image'>
          <div className='DrawDuoUser__submitted'>Submitted</div>
        </div>
        <div className='DrawDuoUser__label'>
          <span>Simon</span>
        </div>
      </div>
    )
  }
}

export default DrawDuoUser;
