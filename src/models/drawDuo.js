import React from 'react';
import DrawDuoDisplayInitiating from '../games/DrawDuo/screens/DrawDuoDisplayInitiating/DrawDuoDisplayInitiating';
import DrawDuoDisplayDrawing from '../games/DrawDuo/screens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import DrawDuoDisplayVoting from '../games/DrawDuo/screens/DrawDuoDisplayVoting/DrawDuoDisplayVoting';
import DrawDuoDisplayCompleted from '../games/DrawDuo/screens/DrawDuoDisplayCompleted/DrawDuoDisplayCompleted';
import {DRAW_DUO_CONFIG} from '../games/DrawDuo/config';

export const DRAW_DUO_CURRENT_STATE_INITIATING = 'initiating';
export const DRAW_DUO_CURRENT_STATE_PLAYING = 'playing';
export const DRAW_DUO_CURRENT_STATE_COMPLETED = 'completed';

export const DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED = 'completed';
export const DRAW_DUO_ROUND_CURRENT_STATE_DRAWING = 'drawing';
export const DRAW_DUO_ROUND_CURRENT_STATE_PENDING = 'pending';
export const DRAW_DUO_ROUND_CURRENT_STATE_VOTING = 'voting';

export const DRAW_DUO_ENTRY_CURRENT_STATE_PENDING = 'pending';
export const DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING = 'guessing';
export const DRAW_DUO_ENTRY_CURRENT_STATE_VOTING = 'voting';
export const DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS = 'results';
export const DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED = 'completed';

export const DRAW_DUO_GAME_STATE_COMPLETED = 'gameStateCompleted';
export const DRAW_DUO_GAME_STATE_INITIATING = 'gameStateInitiating';
export const DRAW_DUO_GAME_STATE_ROUND_DRAWING = 'gameStateRoundDrawing';
export const DRAW_DUO_GAME_STATE_ROUND_VOTING = 'gameStateRoundVoting';

export const DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING = 'gameVotingSubStateGuessing';
export const DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING = 'gameVotingSubStateVoting';
export const DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS = 'gameVotingSubStateResults';

export interface Pair {
}

export interface User {
}

export interface Entry {
  currentState: string,
  guessingStartTimestamp: string,
  votingStartTimestamp: string,
  drawingsSubmitted: boolean,
  guessesSubmitted: boolean,
  votesSubmitted: boolean,
  answerRevealed: boolean,
  pair: string,
  prompt: string,
  drawings: {},
  guesses: {},
  votes: {},
}

export interface Round {
  drawingsStartTimestamp: string,
  currentState: string,
  entries: {},
}

export interface Drawing {
  drawing: string,
  entry: string,
  user: string,
}

export interface DrawDuoGame {
  completedTimestamp: string,
  currentState: string,
  totalRounds: number,
  currentRound: string,
  drawingTimer: number,
  guessTimer: number,
  voteTimer: number,
  revealTimer: number,
  pairs: {},
  rounds: {},
  entries: {},
  drawings: {},
  guesses: {},
}

const EXAMPLE_DRAW_DUO_GAME: DrawDuoGame = {
  currentState: 'playing',
  totalRounds: 2,
  currentRound: 'roundid',
  pairs: {
    'pairid': {
      'userid': true,
      'userid': true,
    },
    'pairid': {
      'userid': true,
      'userid': true,
    },
    'pairid': {
      'userid': true,
      'userid': true,
    },
    'pairid': {
      'userid': true,
      'userid': true,
    },
  },
  rounds: {
    'roundid': {
      currentState: 'completed',
      drawingsStartTimestamp: '',
      entries: {
        'entryid': {
          completed: true,
        },
        'entryid': {
          completed: true,
        },
        'entryid': {
          completed: true,
        },
      }
    },
    'roundid': {
      currentState: 'voting',
      entries: {
        'entryid': {
          completed: true,
        },
        'entryid': {
          completed: false,
        },
        'entryid': {
          completed: false,
        },
      }
    },
  },
  entries: {
    'entryid': {
      votingStartTimestamp: '',
      guessesSubmitted: true,
      drawingsSubmitted: true,
      votesSubmitted: true,
      answerRevealed: true,
      pair: 'pairid',
      prompt: 'DRAWING PROMPT GOES HERE',
      drawings: {
        'drawingid': true,
        'drawingid': true,
      },
      guesses: {
        'guessid': true,
        'guessid': true,
        'guessid': true,
        'guessid': true,
      },
      votes: {
        'userid': 'guessid',
        'userid': 'guessid',
        'userid': 'guessid',
        'userid': 'guessid',
      },
    }
  },
  drawings: {
    'drawingid': {
      drawing: 'DRAWING GOES HERE',
      entry: 'entryid',
      user: 'userid',
    }
  },
  guesses: {
    'guessid': {
      guess: 'GUESS GOES HERE',
      user: 'userid',
    }
  },
};

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