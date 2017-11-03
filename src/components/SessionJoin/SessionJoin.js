import React, {Component} from 'react';
import './SessionJoin.css';
import UserHeader from '../UserHeader/UserHeader';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';

class SessionJoin extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='SessionJoin'>
          <div>
            <PlainInput reducedPadding={true}>
              <input type='text' className='SessionJoin__nameInput'
                     placeholder='Enter your name'/>
            </PlainInput>
          </div>
          <div className='SessionJoin__drawing'>draw yourself</div>
          <div className='SessionJoin__bottomControls'>
            <MainButton fullWidth={true}>
              <button>Done</button>
            </MainButton>
          </div>
      </div>
    );
  }
}

export default SessionJoin;
