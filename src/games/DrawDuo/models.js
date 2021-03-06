import React from 'react';

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
export const DRAW_DUO_GAME_VOTING_SUB_STATE_COMPLETED = 'gameVotingSubStateCompleted';

export interface Pair {
}

export interface User {
}

export interface Answer {
  text: string,
  order: number,
}

export interface TalliedAnswer {
  order: number,
  count: number,
  users: {},
}

export interface FormattedAnswer {
  prompt: boolean,
  text: string,
  order: number,
  key: string,
  users: {},
}

export interface Guess {
  guess: string,
  user: string,
}

export interface Entry {
  currentState: string,
  currentRevealedAnswerIndex: number,
  guessingStartTimestamp: string,
  votingStartTimestamp: string,
  drawingsSubmitted: boolean,
  guessesSubmitted: boolean,
  votesSubmitted: boolean,
  answersTallied: {},
  answerRevealed: boolean,
  pair: string,
  prompt: string,
  drawings: {},
  guesses: {},
  votes: {},
  answers: {},
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
  currentEntry: string,
  currentState: string,
  totalRounds: number,
  currentRound: string,
  drawingTimer: number,
  guessTimer: number,
  voteTimer: number,
  revealTimer: number,
  revealAnswerTimer: number,
  sleepTimer: number,
  pairs: {},
  rounds: {},
  entries: {},
  drawings: {},
  guesses: {},
}

export interface FullSession {
  drawDuo: DrawDuoGame,
  users: {},
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
      answersTallied: {},
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

