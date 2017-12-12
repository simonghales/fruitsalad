import React, {Component} from 'react';
import './DrawDuoControllerDrawing.css';
import DrawableCanvas from 'react-drawable-canvas';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import ArtyButton from '../../../../components/ArtyButton/ArtyButton';
import {getUserEntry} from '../../logic/entries';
import {firebaseConnect} from 'react-redux-firebase';
import {EntryModel, SessionModel} from '../../logic/models';
import {uploadDrawingImage} from '../../../../firebase/user';
import {getCurrentRoundKey, submitRoundUserDrawing} from '../../logic/rounds';
import {withRouter} from 'react-router';
import DrawingCanvas from '../../../../components/DrawingCanvas/DrawingCanvas';
import PreventScroll from '../../../../components/PreventScroll/PreventScroll';
import Screen from '../../../../components/Screen/Screen';
import Button from '../../../../components/Button/Button';
import Heading from '../../../../components/Heading/Heading';
import FullScreenLoadingMessage from '../../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import analyticsEvents from '../../../../analytics/analyticsEvents';

class DrawDuoControllerDrawing extends Component {

  props: {
    firebase: {},
    userEntry: EntryModel,
    userKey: string,
    session: SessionModel,
    sessionKey: string,
    roundKey: string,
  };

  state: {
    submitting: boolean,
    submitted: boolean,
  };

  canvasElem;
  canvasProps = {
    brushColor: '#000000',
    lineWidth: 2,
    canvasStyle: {
      backgroundColor: 'FFFFFF',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    clear: false
  };

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitted: false,
    };
    this.submitDrawing = this.submitDrawing.bind(this);
  }

  submitDrawing() {
    console.log('submit drawing...');
    const {submitting, submitted} = this.state;
    if (submitted || submitting) return;
    const {firebase, userKey, session, sessionKey, roundKey} = this.props;
    this.setState({
      submitting: true,
    });

    const image = (this.canvasElem) ? this.canvasElem.getDataUrl().replace('data:image/png;base64,', '') : '';

    const ref = firebase.ref(`/sessions/${sessionKey}/drawDuo`);

    uploadDrawingImage(image, firebase, sessionKey, roundKey, userKey)
      .then(({downloadURL}) => {
        submitRoundUserDrawing(downloadURL, userKey, session.drawDuo, ref);
        analyticsEvents.drawDuoDrawingSubmitted();
        this.setState({
          submitting: false,
          submitted: true,
        });
      });

  }

  setCanvasElem(elem) {
    this.canvasElem = elem;
  }

  render() {
    return (
      <Screen>
        <PreventScroll>
          {this.renderContent()}
        </PreventScroll>
      </Screen>
    )
  }

  renderContent() {
    const {userEntry} = this.props;
    const {submitting, submitted} = this.state;
    if (submitting || submitted) return (
      <FullScreenLoadingMessage title='SUBMITTED!' subtitle='waiting for others' subtitleSize='small'/>
    );
    return (
      <div className='DrawDuoControllerDrawing__content'>
        <header className='DrawDuoControllerDrawing__header'>
          <Heading>draw this...</Heading>
          <div className='DrawDuoControllerDrawing__prompt'>{
            (userEntry && userEntry.prompt) ? userEntry.prompt : 'no entry'
          }</div>
        </header>
        <div className='DrawDuoControllerDrawing__drawingContainer'>
          <DrawingCanvas ref={(elem) => {
            if (!this.canvasElem) this.setCanvasElem(elem);
          }} {...this.canvasProps}/>
        </div>
        <div className='DrawDuoControllerDrawing__buttonWrapper'>
          <Button onClick={this.submitDrawing} mobileFullWidth={true}>submit</Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: AppState, props) => {
  const {firebase, match} = props;
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  const roundKey = getCurrentRoundKey(session.drawDuo);
  return {
    userEntry: getUserEntry(currentUser.uid, session.drawDuo),
    userKey: currentUser.uid,
    session,
    sessionKey: state.session.sessionCode,
    roundKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerDrawing)));
