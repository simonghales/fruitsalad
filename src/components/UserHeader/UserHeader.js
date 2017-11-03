import React, {Component} from 'react';
import './UserHeader.css';
import {
  withRouter,
} from 'react-router-dom';

class UserHeader extends Component {

  props: {
    history: any,
  };

  constructor(props) {
    super(props);
    this.returnHome = this.returnHome.bind(this);
  }

  returnHome() {
    const {history} = this.props;
    history.push('/');
  }

  render() {
    return (
      <header className='UserHeader'>
        <div className='UserHeader__thumbWrapper'>
          <div className='UserHeader__thumb'></div>
        </div>
        <div className='UserHeader__info'>
          <div className='UserHeader__name'>Simon</div>
          <div className='UserHeader__roomCode'>Roomcode</div>
        </div>
        <div onClick={this.returnHome}>HOME</div>
      </header>
    );
  }
}

export default withRouter(UserHeader);
