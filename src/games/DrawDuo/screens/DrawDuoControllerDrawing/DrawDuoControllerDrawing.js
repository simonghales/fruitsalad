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
import {submitRoundUserDrawing} from '../../logic/rounds';
import {withRouter} from 'react-router';

class DrawDuoControllerDrawing extends Component {

  props: {
    firebase: {},
    userEntry: EntryModel,
    userKey: string,
    session: SessionModel,
    sessionKey: string,
  };

  state: {
    submitting: boolean,
    submitted: boolean,
  };

  canvasElem;
  canvasProps = {
    brushColor: '#000000',
    lineWidth: 3,
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
    const {firebase, userKey, session, sessionKey} = this.props;
    this.setState({
      submitting: true,
    });

    const image = (this.canvasElem) ? this.canvasElem.state.canvas.toDataURL('image/png').replace('data:image/png;base64,', '') : '';

    const ref = firebase.ref(`/sessions/${sessionKey}/drawDuo`);

    uploadDrawingImage(image, firebase)
      .then(({downloadURL}) => {
        console.log('uploaded drawing', downloadURL);
        submitRoundUserDrawing(downloadURL, userKey, session.drawDuo, ref);
      });

  }

  render() {
    const {userEntry} = this.props;
    return (
      <div className='DrawDuoControllerDrawing'>
        <div className='DrawDuoControllerDrawing__content'>
          <h3 className='DrawDuoControllerDrawing__title'>
            draw this
          </h3>
          <div className='DrawDuoControllerDrawing__prompt'>{userEntry.prompt}</div>
          <div className='DrawDuoControllerDrawing__drawingContainer'>
            <DrawableCanvas {...this.canvasProps}/>
          </div>
          <div className='DrawDuoControllerDrawing__buttonWrapper'>
            <ArtyButton onClick={this.submitDrawing}>Submit</ArtyButton>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState, props) => {
  const {firebase, match} = props;
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  return {
    userEntry: getUserEntry(currentUser.uid, session.drawDuo),
    userKey: currentUser.uid,
    session,
    sessionKey: match.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoControllerDrawing)));
