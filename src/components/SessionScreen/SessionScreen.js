import React, {Component} from 'react';
import './SessionScreen.css';

class SessionScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='SessionScreen'>
        <header>Top</header>
        <div>
          <div>enter your name</div>
          <div>draw yourself</div>
          <div>done</div>
        </div>
      </div>
    );
  }
}

export default SessionScreen;
