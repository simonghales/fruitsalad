import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenNotFound.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSessionEnforced, setJoined} from '../../redux/reducers/session/reducer';
import {joinAddUser} from '../../firebase/user';
import Screen from '../../components/Screen/Screen';
import {isUserJoined} from '../../games/DrawDuo/logic/users';
import {Link} from 'react-router-dom';

class SessionScreenNotFound extends Component {

  props: {
    sessionCode: string,
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {sessionCode} = this.props;

    return (
      <div className='SessionScreenNotFound'>
        <div className='SessionScreenNotFound__content'>
          <h3 className='SessionScreenNotFound__title'>{sessionCode} not found</h3>
          <div>if you want to create the session visit</div>
          <div className='SessionScreenNotFound__linkWrapper'>
            <Link to='/host'>fruitsalad.party/host</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreenNotFound);
