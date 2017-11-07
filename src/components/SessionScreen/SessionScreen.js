import React, {Component} from 'react';
import './SessionScreen.css';
import {
  Route,
} from 'react-router-dom';
import {connect} from 'react-redux';
import UserHeader from '../UserHeader/UserHeader';
import SessionJoin from '../SessionJoin/SessionJoin';
import SessionGroup from '../SessionGroup/SessionGroup';
import SessionLoading from '../SessionLoading/SessionLoading';
import {SessionState, setSessionCode, setUserName} from '../../redux/reducers/session';
import SessionHub from '../SessionHub/SessionHub';

class SessionScreen extends Component {

  props: {
    match: any,
    setSessionCode(sessionCode: string): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    const {match, setSessionCode} = props;
    setSessionCode(match.params.id);
  }

  render() {
    return (
      <div className='SessionScreen'>
        <UserHeader/>
        <Route key='/session/:id/join' path='/session/:id/join' component={SessionJoin}/>
        <Route key='/session/:id/loading' path='/session/:id/loading' component={SessionLoading}/>
        <Route key='/session/:id' path='/session/:id' exact={true} component={SessionHub}/>
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);

