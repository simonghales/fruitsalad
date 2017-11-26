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
  Entry, FormattedAnswer
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
    revealAnswerTimer: DRAW_DUO_CONFIG.defaults.revealAnswerTimer,
    sleepTimer: DRAW_DUO_CONFIG.defaults.sleepTimer,
    entries: {},
    pairs: {},
    rounds: {},
    guesses: {},
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
    currentRevealedAnswerIndex: -1,
    guessingStartTimestamp: '',
    votingStartTimestamp: '',
    guessesSubmitted: false,
    drawingsSubmitted: false,
    votesSubmitted: false,
    answerRevealed: false,
    answersTallied: {},
    pair: pairId,
    prompt: 'a couple of musical dogs',
    drawings: {
      'drawingid': true,
    },
    guesses: {},
    votes: {},
    answers: {},
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

export function getCurrentEntryData(drawDuoState: DrawDuoGame) {
  if (!drawDuoState.currentEntry) {
    console.warn('No current entry');
    return null;
  }
  return drawDuoState.entries[drawDuoState.currentEntry];
}

export function getSortedAnswers(currentEntry: Entry, drawDuoState: DrawDuoGame) {
  if (!currentEntry) return [];
  const {answers} = currentEntry;
  const {guesses} = drawDuoState;
  if (!answers) return [];
  const answerKeys = getSortedAnswerKeys(answers);
  let sortedAnswers = [];
  answerKeys.forEach((answerKey) => {
    const answer = getFormattedAnswer(answers, answerKey, guesses, currentEntry);
    sortedAnswers.push(answer);
  });
  return sortedAnswers;
}

function getFormattedAnswer(answers, answerKey, guesses, currentEntry) {
  return {
    ...answers[answerKey],
    text: (answers[answerKey].guess) ? guesses[answers[answerKey].guess].guess : currentEntry.prompt,
    key: answerKey,
  };
}

function getSortedAnswerKeys(answers) {
  return Object.keys(answers).sort((key1, key2) => {
    return answers[key1].order > answers[key2].order;
  })
}

export function splitAnswers(currentEntry: Entry, drawDuoState: DrawDuoGame) {
  if (!currentEntry) return [];
  const {answers} = currentEntry;
  const {guesses} = drawDuoState;
  if (!answers) return [];
  const answerKeys = getSortedAnswerKeys(answers);
  let leftAnswers = [];
  let rightAnswers = [];
  let halfCount = Math.ceil(answerKeys.length / 2);
  answerKeys.forEach((answerKey) => {
    const answer = {
      ...answers[answerKey],
      text: (answers[answerKey].guess) ? guesses[answers[answerKey].guess].guess : currentEntry.prompt,
      key: answerKey,
    };
    if (leftAnswers.length < halfCount) {
      leftAnswers.push(answer);
    } else {
      rightAnswers.push(answer);
    }
  });
  return [leftAnswers, rightAnswers];
}

export function getCurrentAnswer(currentEntry: Entry, votedAnswers: FormattedAnswer[]) {
  if (!currentEntry) return null;
  const {currentRevealedAnswerIndex, currentState} = currentEntry;
  if (currentState !== DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS) return null;
  if (currentRevealedAnswerIndex > votedAnswers.length - 1) return null;
  return votedAnswers[currentRevealedAnswerIndex];
}

export function getVotedAnswers(currentEntry: Entry, drawDuoState: DrawDuoGame) {
  if (!currentEntry) return [];
  const {guesses} = drawDuoState;
  const {answers, answersTallied} = currentEntry;
  if (!answers || !answersTallied) return [];
  const orderedAnswers = Object.keys(answersTallied).sort((key1, key2) => answersTallied[key1].order > answersTallied[key2].order)
    .map((answerKey) => {
      return getFormattedAnswer(answers, answerKey, guesses, currentEntry);
    });
  console.log('orderedAnswers', orderedAnswers);
  return orderedAnswers;
}