import {DrawDuoModel, DrawDuoModelState, DrawDuoRefModel, SessionUsersModel} from './models';
import {
  DRAW_DUO_STATE_COMPLETED, DRAW_DUO_STATE_INITIATING, DRAW_DUO_STATE_PENDING,
  DRAW_DUO_STATE_PLAYING
} from './constants';
import {DRAW_DUO_CONFIG} from '../config';
import {generatePairs, getDefaultUsers} from './users';
import {generateEntries} from './entries';
import {generateRounds} from './rounds';

export function getGameCurrentState(drawDuo: DrawDuoModel): DrawDuoModelState {
  return drawDuo.state;
}

export function populateGameData(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel, sessionUsers: SessionUsersModel): void {
  const users = (sessionUsers) ? sessionUsers : getDefaultUsers(drawDuoRef);
  const pairs = generatePairs(users, drawDuoRef, drawDuo.config.pairSize);
  const entries = generateEntries(drawDuo, drawDuoRef, pairs);
  const rounds = generateRounds(drawDuo, drawDuoRef, entries, pairs);
  drawDuoRef.update({
    entries: entries,
    pairs: pairs,
    rounds: rounds,
    users: users,
  });
}

export function setGameInitiating(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  drawDuoRef.update({
    state: DRAW_DUO_STATE_INITIATING,
  });
}

export function setGamePlaying(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  drawDuoRef.update({
    state: DRAW_DUO_STATE_PLAYING,
  });
}

export function setGameCompleted(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  drawDuoRef.update({
    state: DRAW_DUO_STATE_COMPLETED,
  });
}

export function initiateGame(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  drawDuoRef.set(generateInitialGameState());
}

export function isTimerKey(timerKey: string, drawDuo: DrawDuoModel): boolean {
  return (drawDuo.timer && drawDuo.timer === timerKey);
}

export function setTimerKey(drawDuoRef: DrawDuoRefModel): string {
  const timerKey = drawDuoRef.push().key;
  drawDuoRef.update({
    timer: timerKey,
  });
  return timerKey;
}

export function clearTimerKey(drawDuoRef: DrawDuoRefModel) {
  drawDuoRef.update({
    timer: '',
  });
}

function generateInitialGameState(): DrawDuoModel {
  return {
    config: {
      pairSize: DRAW_DUO_CONFIG.defaults.pairSize,
      numberOfRounds: DRAW_DUO_CONFIG.defaults.numberOfRounds,
      timers: {
        drawing: DRAW_DUO_CONFIG.defaults.drawingTimer,
        guess: DRAW_DUO_CONFIG.defaults.guessTimer,
        vote: DRAW_DUO_CONFIG.defaults.voteTimer,
        reveal: DRAW_DUO_CONFIG.defaults.revealTimer,
        revealAnswer: DRAW_DUO_CONFIG.defaults.revealAnswerTimer,
        revealFinalAnswer: DRAW_DUO_CONFIG.defaults.revealFinalAnswerTimer,
        completedEntry: DRAW_DUO_CONFIG.defaults.completedEntryTimer,
        sleep: DRAW_DUO_CONFIG.defaults.sleepTimer,
        sessionStart: DRAW_DUO_CONFIG.defaults.sessionStartTimer,
        gameInitiating: DRAW_DUO_CONFIG.defaults.gameInitiatingTimer,
      },
    },
    currentEntry: false,
    currentRound: false,
    currentHost: false,
    entries: {},
    users: {},
    pairs: {},
    rounds: {},
    state: DRAW_DUO_STATE_PENDING,
  };
}

export function getDrawingTimer(drawDuo: DrawDuoModel) {
  return drawDuo.config.timers.drawing;
}

export function getGuessingTimer(drawDuo: DrawDuoModel) {
  return drawDuo.config.timers.guess;
}

export function getVotingTimer(drawDuo: DrawDuoModel) {
  return drawDuo.config.timers.vote;
}