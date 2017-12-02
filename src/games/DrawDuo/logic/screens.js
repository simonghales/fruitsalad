import React from 'react';
import {DrawDuoModel, DrawDuoModelState, RoundModelState} from './models';
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
      return null;
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
    case DRAW_DUO_ROUND_STATE_RESULTS || DRAW_DUO_ROUND_STATE_COMPLETED:
      return null;
    default:
      console.warn(`unable to match roundCurrentState: ${roundCurrentState}`);
      return null;

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
      return null;
    default:
      console.warn(`unable to match entryCurrentState: ${entryCurrentState}`);
      return null;
  }

}