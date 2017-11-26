import React from 'react';
import {DRAW_DUO_CONFIG} from './config';
import {
  DRAW_DUO_CURRENT_STATE_COMPLETED,
  DRAW_DUO_CURRENT_STATE_INITIATING,
  DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING,
  DRAW_DUO_ENTRY_CURRENT_STATE_PENDING,
  DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS,
  DRAW_DUO_ENTRY_CURRENT_STATE_VOTING,
  DRAW_DUO_GAME_STATE_COMPLETED,
  DRAW_DUO_GAME_STATE_INITIATING,
  DRAW_DUO_GAME_STATE_ROUND_DRAWING,
  DRAW_DUO_GAME_STATE_ROUND_VOTING,
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING,
  DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING,
  DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED,
  DRAW_DUO_ROUND_CURRENT_STATE_DRAWING,
  DRAW_DUO_ROUND_CURRENT_STATE_PENDING,
  DRAW_DUO_ROUND_CURRENT_STATE_VOTING,
  DrawDuoGame,
  Entry
} from './models';
import DrawDuoDisplayCompleted from './screens/DrawDuoDisplayCompleted/DrawDuoDisplayCompleted';
import DrawDuoDisplayInitiating from './screens/DrawDuoDisplayInitiating/DrawDuoDisplayInitiating';
import DrawDuoDisplayDrawing from './screens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import DrawDuoDisplayVoting from './screens/DrawDuoDisplayVoting/DrawDuoDisplayVoting';

export function generateInitialGameState(): DrawDuoGame {
  return {
    completedTimestamp: '',
    currentEntry: '',
    currentState: DRAW_DUO_CURRENT_STATE_INITIATING,
    currentRound: '',
    totalRounds: DRAW_DUO_CONFIG.defaults.numberOfRounds,
    drawingTimer: DRAW_DUO_CONFIG.defaults.drawingTimer,
    guessTimer: DRAW_DUO_CONFIG.defaults.guessTimer,
    voteTimer: DRAW_DUO_CONFIG.defaults.voteTimer,
    revealTimer: DRAW_DUO_CONFIG.defaults.revealTimer,
    sleepTimer: DRAW_DUO_CONFIG.defaults.sleepTimer,
    entries: {},
    pairs: {},
    rounds: {},
  };
}

export function generateRound(entries) {
  return {
    currentState: DRAW_DUO_ROUND_CURRENT_STATE_PENDING,
    drawingsStartTimestamp: '',
    entries: entries,
  }
}

export function generateEntry(pairId) {
  return {
    currentState: DRAW_DUO_ENTRY_CURRENT_STATE_PENDING,
    guessingStartTimestamp: '',
    votingStartTimestamp: '',
    guessesSubmitted: false,
    drawingsSubmitted: false,
    votesSubmitted: false,
    answerRevealed: false,
    pair: pairId,
    prompt: 'DRAWING PROMPT GOES HERE',
    drawings: {
      'drawingid': true,
    },
    guesses: {
      'guessid': true,
    },
    votes: {
      'userid': 'guessid',
    },
  }
}

export function getGameCurrentState(drawDuoState: DrawDuoGame) {
  if (drawDuoState.currentState === DRAW_DUO_CURRENT_STATE_COMPLETED) {
    return DRAW_DUO_GAME_STATE_COMPLETED;
  }
  if (drawDuoState.currentState === DRAW_DUO_CURRENT_STATE_INITIATING) {
    return DRAW_DUO_GAME_STATE_INITIATING;
  }

  const {currentRound} = drawDuoState;

  if (currentRound) {

    const {rounds} = drawDuoState;

    if (rounds[currentRound]) {

      const currentRoundData = rounds[currentRound];
      const {currentState: currentRoundState} = currentRoundData;

      if (currentRoundState === DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED) {
        // need to start a round?
        return 'unknown';
      }

      if (currentRoundState === DRAW_DUO_ROUND_CURRENT_STATE_DRAWING) {
        return DRAW_DUO_GAME_STATE_ROUND_DRAWING;
      }

      if (currentRoundState === DRAW_DUO_ROUND_CURRENT_STATE_VOTING) {
        return DRAW_DUO_GAME_STATE_ROUND_VOTING;
      }

    } else {

      // that's an error
      return 'unknown';

    }

  } else {
    // need to start a round?
    return 'unknown';
  }

  return 'unknown';

}

export function getGameVotingCurrentSubState(drawDuoState: DrawDuoGame) {

  const {currentEntry} = drawDuoState;

  if (!currentEntry) {
    console.warn('no current entry');
    return 'unknown';
  }

  const currentEntryData: Entry = drawDuoState.entries[currentEntry];

  if (currentEntryData.currentState === DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING) {
    return DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING;
  }

  if (currentEntryData.currentState === DRAW_DUO_ENTRY_CURRENT_STATE_VOTING) {
    return DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING;
  }

  if (currentEntryData.currentState === DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS) {
    return DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS;
  }

  console.warn('no match?', currentEntryData.currentState);
  return 'unknown';

}

export function getDisplayComponentFromGameState(drawDuoState: DrawDuoGame) {
  if (!drawDuoState) return null;
  const currentState = getGameCurrentState(drawDuoState);
  if (currentState === DRAW_DUO_GAME_STATE_COMPLETED) {
    return <DrawDuoDisplayCompleted/>
  }
  if (currentState === DRAW_DUO_GAME_STATE_INITIATING) {
    return <DrawDuoDisplayInitiating/>
  }
  if (currentState === DRAW_DUO_GAME_STATE_ROUND_DRAWING) {
    return <DrawDuoDisplayDrawing/>
  }
  if (currentState === DRAW_DUO_GAME_STATE_ROUND_VOTING) {
    return <DrawDuoDisplayVoting/>
  }
  return null;
}

export function getDisplayComponentFromGameVotingSubState(drawDuoState: DrawDuoGame) {
  if (!drawDuoState) return null;
  const currentSubState = getGameVotingCurrentSubState(drawDuoState);
  if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING) {

  }
  if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING) {

  }
  if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS) {

  }
  return null;
}