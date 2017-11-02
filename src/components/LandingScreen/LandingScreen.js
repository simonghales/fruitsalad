import React, {Component} from 'react';
import './LandingScreen.css';
import {
  withRouter,
} from 'react-router-dom';

class LandingScreen extends Component {

  props: {
    history: any,
  };

  constructor(props) {
    super(props);
    this.hostSession = this.hostSession.bind(this);
  }

  hostSession() {
    const {history} = this.props;
    history.push('/session');
  }

  render() {
    return (
      <div className='LandingScreen'>
        <div className='LandingScreen__intro'>
          <h2 className='LandingScreen__intro__title'>fruit salad</h2>
        </div>
        <div className='LandingScreen__blurb'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam aut cumque debitis ducimus.
          </p>
          <p>
            Reiciendis tempora temporibus! Laboriosam omnis.
          </p>
        </div>
        <div className='LandingScreen__options'>
          <input type='text' className='LandingScreen__option LandingScreen__option--input'
                 placeholder='Enter session code'/>
          <div className='LandingScreen__options__divider'>or</div>
          <div className='LandingScreen__option LandingScreen__option--action' onClick={this.hostSession}>Host Session
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingScreen);
