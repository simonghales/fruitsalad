import React, {Component} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import BottomSide from '../../components/BottomSide/BottomSide';
import SimpleButton from '../../components/SimpleButton/SimpleButton';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';
import {SessionState, setGameInPlay} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import {firebaseConnect} from 'react-redux-firebase';

class SessionScreenHubBottom extends Component {

  props: {
    history: any,
    firebase: {},
    match: any,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.share = this.share.bind(this);
    this.start = this.start.bind(this);
  }

  share() {
    const {match} = this.props;
    const sessionCode = match.params.id;
    if (navigator.share) {
      navigator.share({
        title: `Fruit Salad - ${sessionCode}`,
        text: 'Come play with me!',
        url: `https://fruitsalad.herokuapp.com/session/${sessionCode}`,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  start() {
    const {firebase, match} = this.props;
    const sessionKey = match.params.id;

    const sessionRef = firebase.ref(`/sessions/${sessionKey}`);

    sessionRef.update({
      'drawDuo': true,
      'state': 'playing',
    });

  }

  render() {
    return (
      <BottomFlex classes={['SessionScreenHubBottom']}>
        <BottomSide>
          <SimpleButton onClick={this.share}>
            Share
          </SimpleButton>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          <SimpleButton onClick={this.start}>
            Start
          </SimpleButton>
        </BottomSide>
      </BottomFlex>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    sessionCreated: state.session.sessionCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHubBottom)));
