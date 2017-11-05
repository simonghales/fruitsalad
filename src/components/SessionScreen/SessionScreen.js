import React, {Component} from 'react';
import './SessionScreen.css';
import {connect} from 'react-redux';
import UserHeader from '../UserHeader/UserHeader';
import SessionJoin from '../SessionJoin/SessionJoin';
import SessionGroup from '../SessionGroup/SessionGroup';
import SessionLoading from '../SessionLoading/SessionLoading';
import {SessionState, setUserName} from '../../redux/reducers/session';

class SessionScreen extends Component {

  props: {
    setUserName(userName: string): void,
  };

  state: {
    loadedSession: boolean,
    userJoined: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadedSession: false,
      userJoined: false,
    };
    this.setJoined = this.setJoined.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadedSession: true,
      });
    }, 2000);
  }

  setJoined(userName: string) {
    const {setUserName} = this.props;
    setUserName(userName);
    this.setState({
      userJoined: true,
    });
  }

  render() {
    const {loadedSession, userJoined} = this.state;
    return (
      <div className='SessionScreen'>
        <UserHeader/>
        {
          !loadedSession ? (
              <SessionLoading/>
            ) :
            userJoined ? (
              <SessionGroup/>
            ) : (
              <SessionJoin setJoined={this.setJoined}/>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (userName: string) => dispatch(setUserName(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);

