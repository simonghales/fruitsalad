export interface Pair {
}

export interface User {
}

export interface Entry {
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
  currentState: string,
  totalRounds: number,
  currentRound: string,
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

export function generateRound(entries) {
  return {
    currentState: 'pending',
    drawingsStartTimestamp: '',
    entries: entries,
  }
}

export function generateEntry(pairId) {
  return {
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