import React, {Component} from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import BottomFlex from '../../components/BottomFlex/BottomFlex';
import BottomMiddle from '../../components/BottomMiddle/BottomMiddle';
import BottomSide from '../../components/BottomSide/BottomSide';
import SimpleButton from '../../components/SimpleButton/SimpleButton';
import SessionCodePreview from '../../components/SessionCodePreview/SessionCodePreview';
import SessionQuitButton from '../../components/SessionQuitButton/SessionQuitButton';
import {SessionState} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class SessionScreenHostBottom extends Component {

  props: {
    history: any,
    match: any,
    sessionCreated: boolean,
    validSession: boolean,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.goToJoin = this.goToJoin.bind(this);
  }

  goToJoin() {
    const {sessionCreated} = this.props;
    if (!sessionCreated) return;
    const {history, match} = this.props;
    history.push(`/session/${match.params.id}/join`);
  }

  render() {
    const {sessionCreated} = this.props;
    console.log('validSession?', this.props.validSession);
    return (
      <BottomFlex classes={['SessionScreenHostBottom']}>
        <BottomSide>
          <SessionQuitButton disabled={!sessionCreated}/>
        </BottomSide>
        <BottomMiddle>
          <SessionCodePreview/>
        </BottomMiddle>
        <BottomSide>
          {/*<SimpleButton onClick={this.goToJoin} disabled={!sessionCreated}>*/}
          {/*Next*/}
          {/*</SimpleButton>*/}
        </BottomSide>
      </BottomFlex>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  return {
    sessionCreated: state.session.sessionCreated,
    validSession: isLoaded(sessions) && !isEmpty(sessions),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedFirebaseConnect = firebaseConnect((props) => {
  return [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
    },
  ];
})(SessionScreenHostBottom);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedFirebaseConnect));
