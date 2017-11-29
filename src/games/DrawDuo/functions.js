import React from 'react';
import {DRAW_DUO_CONFIG} from './config';
import {
  DRAW_DUO_CURRENT_STATE_COMPLETED,
  DRAW_DUO_CURRENT_STATE_INITIATING, DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED,
  DRAW_DUO_ENTRY_CURRENT_STATE_GUESSING,
  DRAW_DUO_ENTRY_CURRENT_STATE_PENDING,
  DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS,
  DRAW_DUO_ENTRY_CURRENT_STATE_VOTING,
  DRAW_DUO_GAME_STATE_COMPLETED,
  DRAW_DUO_GAME_STATE_INITIATING,
  DRAW_DUO_GAME_STATE_ROUND_DRAWING,
  DRAW_DUO_GAME_STATE_ROUND_VOTING, DRAW_DUO_GAME_VOTING_SUB_STATE_COMPLETED,
  DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING,
  DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS,
  DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING,
  DRAW_DUO_ROUND_CURRENT_STATE_COMPLETED,
  DRAW_DUO_ROUND_CURRENT_STATE_DRAWING,
  DRAW_DUO_ROUND_CURRENT_STATE_PENDING,
  DRAW_DUO_ROUND_CURRENT_STATE_VOTING,
  DrawDuoGame,
  Entry, FormattedAnswer, FullSession
} from './models';
import DrawDuoDisplayCompleted from './screens/DrawDuoDisplayCompleted/DrawDuoDisplayCompleted';
import DrawDuoDisplayInitiating from './screens/DrawDuoDisplayInitiating/DrawDuoDisplayInitiating';
import DrawDuoDisplayDrawing from './screens/DrawDuoDisplayDrawing/DrawDuoDisplayDrawing';
import DrawDuoDisplayVoting from './screens/DrawDuoDisplayVoting/DrawDuoDisplayVoting';
import DrawDuoControllerCompleted from './screens/DrawDuoControllerCompleted/DrawDuoControllerCompleted';
import DrawDuoControllerInitiating from './screens/DrawDuoControllerInitiating/DrawDuoControllerInitiating';
import DrawDuoControllerDrawing from './screens/DrawDuoControllerDrawing/DrawDuoControllerDrawing';
import DrawDuoControllerVoting from './screens/DrawDuoControllerVoting/DrawDuoControllerVoting';
import DrawDuoControllerGuessing from './screens/DrawDuoControllerGuessing/DrawDuoControllerGuessing';
import DrawDuoControllerResults from './screens/DrawDuoControllerResults/DrawDuoControllerResults';

export function generateInitialGameState(): DrawDuoGame {
  return {
    completedTimestamp: '',
    currentEntry: '',
    currentState: DRAW_DUO_CURRENT_STATE_INITIATING,
    currentRound: '',
    totalRounds: DRAW_DUO_CONFIG.defaults.numberOfRounds,
    completedEntryTimer: DRAW_DUO_CONFIG.defaults.completedEntryTimer,
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

  if (currentEntryData.currentState === DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED) {
    return DRAW_DUO_GAME_VOTING_SUB_STATE_COMPLETED;
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

export function getControllerComponentFromGameState(drawDuoState: DrawDuoGame) {
  if (!drawDuoState) return null;
  const currentState = getGameCurrentState(drawDuoState);
  if (currentState === DRAW_DUO_GAME_STATE_COMPLETED) {
    return <DrawDuoControllerCompleted/>
  }
  else if (currentState === DRAW_DUO_GAME_STATE_INITIATING) {
    return <DrawDuoControllerInitiating/>
  }
  else if (currentState === DRAW_DUO_GAME_STATE_ROUND_DRAWING) {
    return <DrawDuoControllerDrawing/>
  }
  else if (currentState === DRAW_DUO_GAME_STATE_ROUND_VOTING) {
    const currentSubState = getGameVotingCurrentSubState(drawDuoState);
    if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_GUESSING) {
      return <DrawDuoControllerGuessing/>
    }
    else if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_VOTING) {
      return <DrawDuoControllerVoting/>
    }
    else if (currentSubState === DRAW_DUO_GAME_VOTING_SUB_STATE_RESULTS) {
      return <DrawDuoControllerResults/>
    }
    else {
      console.warn(`unmatched currentSubState: ${currentSubState}`);
    }
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
  const {answers, answersTallied} = currentEntry;
  const {guesses} = drawDuoState;
  if (!answers) return [];
  const answerKeys = getSortedAnswerKeys(answers);
  let sortedAnswers = [];
  answerKeys.forEach((answerKey) => {
    const answer = getFormattedAnswer(answers, answerKey, guesses, currentEntry, answersTallied);
    sortedAnswers.push(answer);
  });
  return sortedAnswers;
}

function getFormattedAnswer(answers, answerKey: string, guesses, currentEntry: Entry, answersTallied?) {
  const guessKey = (answers[answerKey].guess) ? answers[answerKey].guess : '';
  const guessText = (guesses[guessKey]) ? guesses[guessKey].guess : '';
  const text = (answers[answerKey].guess) ? guessText : currentEntry.prompt;
  let formattedAnswer = {
    ...answers[answerKey],
    text: text,
    key: answerKey,
  };
  if (answersTallied) {
    const users = (answersTallied && answersTallied[answerKey] && answersTallied[answerKey].users) ? Object.keys(answersTallied[answerKey].users).map((userKey) => userKey) : [];
    formattedAnswer.users = users;
  }
  return formattedAnswer;
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
    const answer = getFormattedAnswer(answers, answerKey, guesses, currentEntry);
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
  if (currentState !== DRAW_DUO_ENTRY_CURRENT_STATE_RESULTS && currentState !== DRAW_DUO_ENTRY_CURRENT_STATE_COMPLETED) return null;
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
      return getFormattedAnswer(answers, answerKey, guesses, currentEntry, answersTallied);
    });
  console.log('orderedAnswers', orderedAnswers);
  return orderedAnswers;
}

export function getAnswerRevealIndex(answerKey: string, currentEntry: Entry) {
  const {answersTallied} = currentEntry;
  if (!answersTallied) return -1;
  const sortedAnswersTalliedKeys = getSortedAnswerKeys(answersTallied);
  return sortedAnswersTalliedKeys.findIndex((key) => {
    return (key === answerKey);
  })
}

export function getNonPromptedPairs(drawDuoState: DrawDuoGame) {
  const {pairs} = drawDuoState;
  const currentEntryData: Entry = getCurrentEntryData(drawDuoState);
  const filteredPairs = Object.keys(pairs).filter((pairKey) => {
    return pairKey !== currentEntryData.pair;
  }).map((pairKey) => {
    return {
      users: Object.keys(pairs[pairKey]),
      key: pairKey,
    };
  });
  return filteredPairs;
}

export function getPromptedPair(drawDuoState: DrawDuoGame) {
  const {pairs} = drawDuoState;
  const currentEntryData: Entry = getCurrentEntryData(drawDuoState);
  const promptedPair = Object.keys(pairs).map((pairKey) => {
    return {
      users: Object.keys(pairs[pairKey]),
      key: pairKey,
    };
  }).find((pair) => {
    return pair.key === currentEntryData.pair;
  });
  return promptedPair;
}

export function getPairs(drawDuoState: DrawDuoGame) {
  const {pairs} = drawDuoState;
  const mappedPairs = Object.keys(pairs).map((pairKey) => {
    return {
      users: Object.keys(pairs[pairKey]),
      key: pairKey,
    };
  });
  return mappedPairs;
}

export function getPairedAnswers(session: FullSession): [] {
  const {drawDuo, users} = session;
  if (!drawDuo) return [];
  const currentEntryData: Entry = getCurrentEntryData(drawDuo);
  if (!currentEntryData) return [];
  const filteredPairs = getNonPromptedPairs(drawDuo);
  const mappedPairs = filteredPairs.map((pair) => {
    return {
      users: pair.users.map((userKey) => {
        const userGuessKey = getUserGuessKey(userKey, drawDuo);
        const userAnswer = getAnswerFromGuess(userGuessKey, drawDuo);
        console.log('userGuessKey', userGuessKey);
        console.log('userAnswer', userAnswer);
        return {
          answer: (userAnswer) ? userAnswer : null,
          user: users[userKey],
          key: userKey,
        };
      }),
      key: pair.key,
    }
  });
  return mappedPairs;
}

export function getUserGuessKey(userKey: string, drawDuoState: DrawDuoGame) {
  const {guesses} = drawDuoState;
  return Object.keys(guesses).find((guessKey) => {
    return (guesses[guessKey].user === userKey);
  });
}

export function getAnswerFromGuess(guessKey: string, drawDuoState: DrawDuoGame) {
  const {guesses} = drawDuoState;
  const currentEntryData: Entry = getCurrentEntryData(drawDuoState);
  const {answers} = currentEntryData;
  const filteredAnswers = Object.keys(answers).filter((answerKey) => {
    return !answers[answerKey].prompt;
  }).map((answerKey) => {
    return {
      guessKey: answers[answerKey].guess,
      guess: guesses[answers[answerKey].guess],
      key: answerKey,
    };
  });
  return filteredAnswers.find((answer) => {
    return (answer.guessKey === guessKey);
  });
}

export function getUser(userKey: string, session: FullSession) {
  if (!session || !session.users) return null;
  return (session.users[userKey]) ? session.users[userKey] : null;
}

export function getAnswerGuessText(answer) {
  if (!answer) return '';
  if (!answer.guess) return '';
  return getGuessText(answer.guess);
}

export function getGuessText(guess) {
  if (!guess) return '';
  if (!guess.guess) return '';
  return guess.guess;
}