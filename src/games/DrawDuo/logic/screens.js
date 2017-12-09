import React from 'react';
import {DrawDuoModel, DrawDuoModelState, RoundModelState, SessionModel} from './models';
import DrawDuoDisplayDrawing from '../newscreens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import {
  DRAW_DUO_ENTRY_STATE_COMPLETED,
  DRAW_DUO_ENTRY_STATE_GUESSING,
  DRAW_DUO_ENTRY_STATE_PENDING, DRAW_DUO_ENTRY_STATE_RESULTS, DRAW_DUO_ENTRY_STATE_VOTING,
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING,
  DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS, DRAW_DUO_ROUND_STATE_VOTING,
  DRAW_DUO_STATE_COMPLETED, DRAW_DUO_STATE_INITIATING, DRAW_DUO_STATE_PENDING,
  DRAW_DUO_STATE_PLAYING
} from './constants';
import {getGameCurrentState} from './game';
import {getRoundCurrentState} from './rounds';
import DrawDuoDisplayRound from '../newscreens/DrawDuoDisplayRound/DrawDuoDisplayRound';
import {getEntryCurrentState} from './entries';
import DrawDuoDisplayEntryGuessing from '../newscreens/DrawDuoDisplayEntryGuessing/DrawDuoDisplayEntryGuessing';
import DrawDuoDisplayEntryVoting from '../newscreens/DrawDuoDisplayEntryVoting/DrawDuoDisplayEntryVoting';
import DrawDuoDisplayEntryCompleted from '../newscreens/DrawDuoDisplayEntryCompleted/DrawDuoDisplayEntryCompleted';
import DrawDuoDisplayRoundResults from '../newscreens/DrawDuoDisplayRoundResults/DrawDuoDisplayRoundResults';
import DrawDuoDisplayGameCompleted from '../newscreens/DrawDuoDisplayGameCompleted/DrawDuoDisplayGameCompleted';
import DrawDuoControllerCompleted from '../screens/DrawDuoControllerCompleted/DrawDuoControllerCompleted';
import DrawDuoControllerDrawing from '../screens/DrawDuoControllerDrawing/DrawDuoControllerDrawing';
import DrawDuoControllerResults from '../screens/DrawDuoControllerResults/DrawDuoControllerResults';
import DrawDuoControllerGuessing from '../screens/DrawDuoControllerGuessing/DrawDuoControllerGuessing';
import DrawDuoControllerVoting from '../screens/DrawDuoControllerVoting/DrawDuoControllerVoting';
import DrawDuoControllerPending from '../screens/DrawDuoControllerPending/DrawDuoControllerPending';
import {isUserJoined} from './users';
import {sessionGameInPlay} from './session';
import SessionScreenJoin from '../../../screens/SessionScreenJoin/SessionScreenJoin';
import FullScreenLoadingMessage from '../../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import SessionScreenNotFound from '../../../screens/SessionScreenNotFound/SessionScreenNotFound';
import SessionScreenHub from '../../../screens/SessionScreenHub/SessionScreenHub';
import SessionScreenDefault from '../../../screens/SessionScreenDefault/SessionScreenDefault';

export function getDisplayComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const gameCurrentState: DrawDuoModelState = getGameCurrentState(drawDuo);

  switch (gameCurrentState) {

    case DRAW_DUO_STATE_PENDING:
      return null;
    case DRAW_DUO_STATE_INITIATING:
      return null;
    case DRAW_DUO_STATE_PLAYING:
      return getGamePlayingDisplayComponentFromGameState(drawDuo);
    case DRAW_DUO_STATE_COMPLETED:
      return <DrawDuoDisplayGameCompleted/>;
    default:
      console.warn(`unable to match gameCurrentState: ${gameCurrentState}`);
      return null;

  }

}

export function getGamePlayingDisplayComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const roundCurrentState: RoundModelState = getRoundCurrentState(drawDuo);

  switch (roundCurrentState) {

    case DRAW_DUO_ROUND_STATE_PENDING:
      return null;
    case DRAW_DUO_ROUND_STATE_DRAWING:
      return <DrawDuoDisplayDrawing/>;
    case DRAW_DUO_ROUND_STATE_VOTING:
      return <DrawDuoDisplayRound/>;
    case DRAW_DUO_ROUND_STATE_RESULTS:
      return <DrawDuoDisplayRoundResults/>;
    case DRAW_DUO_ROUND_STATE_COMPLETED:
      return null;
    default:
      console.warn(`unable to match roundCurrentState: ${roundCurrentState}`);
      return null;

  }
}

export function getControllerComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const gameCurrentState: DrawDuoModelState = getGameCurrentState(drawDuo);

  switch (gameCurrentState) {

    case DRAW_DUO_STATE_PENDING:
      return <DrawDuoControllerPending/>;
    case DRAW_DUO_STATE_INITIATING:
      return <DrawDuoControllerPending/>;
    case DRAW_DUO_STATE_PLAYING:
      return getGamePlayingControllerComponentFromGameState(drawDuo);
    case DRAW_DUO_STATE_COMPLETED:
      return <DrawDuoControllerCompleted/>;
    default:
      console.warn(`unable to match gameCurrentState: ${gameCurrentState}`);
      return <DrawDuoControllerPending/>;

  }

}

export function getEntryDisplayComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const entryCurrentState = getEntryCurrentState(drawDuo);

  switch (entryCurrentState) {
    case DRAW_DUO_ENTRY_STATE_PENDING:
      return null;
    case DRAW_DUO_ENTRY_STATE_GUESSING:
      return <DrawDuoDisplayEntryGuessing/>;
    case DRAW_DUO_ENTRY_STATE_VOTING:
      return <DrawDuoDisplayEntryVoting state={entryCurrentState}/>;
    case DRAW_DUO_ENTRY_STATE_RESULTS:
      return <DrawDuoDisplayEntryVoting state={entryCurrentState}/>;
    case DRAW_DUO_ENTRY_STATE_COMPLETED:
      return <DrawDuoDisplayEntryCompleted state={entryCurrentState}/>;
    default:
      console.warn(`unable to match entryCurrentState: ${entryCurrentState}`);
      return null;
  }

}

export function getGamePlayingControllerComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const roundCurrentState: RoundModelState = getRoundCurrentState(drawDuo);

  switch (roundCurrentState) {

    case DRAW_DUO_ROUND_STATE_PENDING:
      return null;
    case DRAW_DUO_ROUND_STATE_DRAWING:
      return <DrawDuoControllerDrawing/>;
    case DRAW_DUO_ROUND_STATE_VOTING:
      return getEntryControllerComponentFromGameState(drawDuo);
    case DRAW_DUO_ROUND_STATE_RESULTS:
      return <DrawDuoControllerResults/>;
    case DRAW_DUO_ROUND_STATE_COMPLETED:
      return <DrawDuoControllerPending/>;
    default:
      console.warn(`unable to match roundCurrentState: ${roundCurrentState}`);
      return null;

  }
}

export function getEntryControllerComponentFromGameState(drawDuo: DrawDuoModel) {
  if (!drawDuo) return null;

  const entryCurrentState = getEntryCurrentState(drawDuo);

  switch (entryCurrentState) {
    case DRAW_DUO_ENTRY_STATE_PENDING:
      return <DrawDuoControllerPending/>;
    case DRAW_DUO_ENTRY_STATE_GUESSING:
      return <DrawDuoControllerGuessing/>;
    case DRAW_DUO_ENTRY_STATE_VOTING:
      return <DrawDuoControllerVoting/>;
    case DRAW_DUO_ENTRY_STATE_RESULTS:
      return <DrawDuoControllerResults/>;
    case DRAW_DUO_ENTRY_STATE_COMPLETED:
      return <DrawDuoControllerResults/>;
    default:
      console.warn(`unable to match entryCurrentState: ${entryCurrentState}`);
      return null;
  }

}

export function getSessionControllerComponentFromSessionState(session: SessionModel, currentUserKey: string) {

  const userJoined = isUserJoined(currentUserKey, session);
  const gameInPlay = sessionGameInPlay(session);

  if (!session) {
    return <SessionScreenNotFound/>;
  }
  if (!userJoined) {
    return <SessionScreenJoin/>;
  }
  if (!gameInPlay) {
    return <SessionScreenHub/>;
  }
  return <SessionScreenDefault/>;
}