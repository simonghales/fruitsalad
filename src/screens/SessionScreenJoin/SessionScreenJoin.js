import React, {Component} from 'react';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSession} from '../../redux/reducers/session/reducer';

class SessionScreenJoin extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {gameInPlay, joined, match} = this.props;

    if (joined && gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    if (joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/hub`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenJoin'>
        <SessionJoin/>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// const wrappedSessionScreenJoin = firebaseConnect((props) => {
//   return [
//     {
//       path: '/sessions',
//       queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
//     },
//   ];
// })(SessionScreenJoin);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenJoin));
