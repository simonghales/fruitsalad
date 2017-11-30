import React, {Component} from 'react';
import './DrawDuoUser.css';

class DrawDuoUser extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='DrawDuoUser'>
        <div className='DrawDuoUser__image'></div>
        <div className='DrawDuoUser__label'>
          <span>Simon</span>
        </div>
      </div>
    )
  }
}

export default DrawDuoUser;
