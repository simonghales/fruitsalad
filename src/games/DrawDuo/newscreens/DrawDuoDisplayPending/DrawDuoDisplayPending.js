import React, {Component} from 'react';
import './DrawDuoDisplayPending.css';
import {connect} from 'react-redux';
import {AppState} from '../../../../redux/index';
import CountdownTimer from '../../../../components/CountdownTimer/CountdownTimer';
import {DrawDuoGame} from '../../models';
import DrawDuoPairs from '../../components/DrawDuoPairs/DrawDuoPairs';
import {DrawDuoModel, SessionModel} from '../../logic/models';
import DrawDuoArtworks from '../../components/DrawDuoArtworks/DrawDuoArtworks';
import DrawDuoTitle from '../../components/DrawDuoTitle/DrawDuoTitle';
import DrawDuoAnimatedMessage from '../../components/DrawDuoAnimatedMessage/DrawDuoAnimatedMessage';
import DrawDuoUserGuessesIndicators from '../../components/DrawDuoUserGuessesIndicators/DrawDuoUserGuessesIndicators';
import {getCurrentPairKey} from '../../logic/users';
import DrawDuoDisplayEntryGuessing from '../DrawDuoDisplayEntryGuessing/DrawDuoDisplayEntryGuessing';
import DrawDuoDisplayEntryVoting from '../DrawDuoDisplayEntryVoting/DrawDuoDisplayEntryVoting';
import {getEntryDisplayComponentFromGameState} from '../../logic/screens';
import {withRouter} from 'react-router';
import DrawDuoDisplayPendingUsers from '../DrawDuoDisplayPendingUsers/DrawDuoDisplayPendingUsers';

class DrawDuoDisplayPending extends Component {

  props: {
    match: {
      params: {
        id: string,
      },
    },
    session: SessionModel,
  };

  render() {
    const {match, session} = this.props;
    const sessionCode = match.params.id;
    return (
      <div className='DrawDuoDisplayPending'>
        <header className='DrawDuoDisplayPending__header'>
          <h2 className='DrawDuoDisplayPending__header__title'>
            Draw Duo
          </h2>
          <DrawDuoAnimatedMessage label={`Join at fruitsalad.party/${sessionCode}`} size='huge'/>
        </header>
        <div className='DrawDuoDisplayPending__content'>
          <DrawDuoDisplayPendingUsers/>
        </div>
        <footer className='DrawDuoDisplayPending__footer'>
          <DrawDuoAnimatedMessage label='The host must press start to begin' size='huge'/>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawDuoDisplayPending));
