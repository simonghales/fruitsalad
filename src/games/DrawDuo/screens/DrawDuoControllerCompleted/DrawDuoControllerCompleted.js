import React, {Component} from 'react';
import './DrawDuoControllerCompleted.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import DrawDuoCenteredMessage from '../../components/DrawDuoCenteredMessage/DrawDuoCenteredMessage';
import Screen from '../../../../components/Screen/Screen';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import Heading from '../../../../components/Heading/Heading';
import Button from '../../../../components/Button/Button';
import {setSessionStatePending, setSessionStateSettingUp} from '../../logic/session';
import {firebaseConnect} from 'react-redux-firebase';

class DrawDuoControllerCompleted extends Component {

  props: {
    firebase: {},
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame() {
    const {firebase, sessionCode} = this.props;
    setSessionStateSettingUp(firebase.ref(`/sessions/${sessionCode}`));
  }

  render() {
    return (
      <Screen>
        <div className='DrawDuoControllerCompleted'>
          <div>
            <Heading size='huge'>fin</Heading>
            <div className='DrawDuoControllerCompleted__buttonWrapper'>
              <Button mobileFullWidth={true} onClick={this.startNewGame}>new game</Button>
            </div>
          </div>
        </div>
      </Screen>
    )
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

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerCompleted));
