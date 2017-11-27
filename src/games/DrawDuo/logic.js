import {DrawDuoGame, Entry, Guess} from './models';
import {randomIntFromInterval} from '../../utils/numbers';

export function generateRandomOrderOfAnswers(drawDuoGameState: DrawDuoGame): string[] {
  const {currentEntry, entries} = drawDuoGameState;
  const currentEntryData: Entry = entries[currentEntry];
  let talliedAnswers = {};
  for (let userKey in currentEntryData.votes) {
    addVoteToAnswers(talliedAnswers, currentEntryData.votes[userKey], userKey);
  }
  const talliedCount = Object.keys(talliedAnswers).length;

  const promptAnswerKey = getPromptAnswerKey(currentEntryData);
  let talliedPromptAdded = false;
  let talliedIndex = 1;

  for (let answerKey in talliedAnswers) {
    if (answerKey === promptAnswerKey) {
      talliedAnswers[answerKey].order = talliedCount;
      talliedPromptAdded = true;
    } else {
      talliedAnswers[answerKey].order = talliedIndex;
      talliedIndex++;
    }
  }
  if (!talliedPromptAdded) {
    talliedAnswers[promptAnswerKey] = {
      order: talliedCount + 1,
      count: 0,
      users: {},
    };
  }
  return talliedAnswers;
}

function getPromptAnswerKey(currentEntryData: Entry) {
  const {answers} = currentEntryData;
  let promptAnswerKey = '';
  for (let answerKey in answers) {
    if (answers[answerKey].prompt) {
      promptAnswerKey = answerKey;
      break;
    }
  }
  if (!promptAnswerKey) {
    console.warn('prompt wasnt found...');
  }
  return promptAnswerKey;
}

function addVoteToAnswers(answers, answerKey: string, userKey: string) {
  if (answers[answerKey]) {
    answers[answerKey] = {
      count: answers[answerKey].count + 1,
      users: {
        ...answers[answerKey].users,
        [userKey]: true,
      },
    };
  } else {
    answers[answerKey] = {
      count: 1,
      users: {
        [userKey]: true,
      }
    }
  }
}

const GUESSES = [
  '2 dogs playing piano',
  '2 dogs jumping on a box',
  'animals breaking my piano',
  'the dogs broke my keyboard',
  'i have no idea',
  '2 cats playing keyboard',
];

export function pushGuesses(drawDuoRef, currentEntry: string) {
  let guesses = {};
  GUESSES.forEach((guess) => {
    const key = drawDuoRef.push().key;
    guesses[`/guesses/${key}`] = {
      guess: guess,
      user: Math.random().toString()
    };
    guesses[`/entries/${currentEntry}/guesses/${key}`] = true;
  });
  drawDuoRef.update(guesses);
}

export function pushVotes(drawDuoRef, drawDuoGameState: DrawDuoGame) {
  const {currentEntry, entries} = drawDuoGameState;
  const currentEntryData: Entry = entries[currentEntry];
  const answerKeys = Object.keys(currentEntryData.answers);
  let votes = {};
  const promptAnswerKey = getPromptAnswerKey(currentEntryData);
  for (let pairKey in drawDuoGameState.pairs) {
    if (pairKey === currentEntryData.pair) continue;
    for (let userKey in drawDuoGameState.pairs[pairKey]) {
      const randomNumber = randomIntFromInterval(0, answerKeys.length + 1);
      if (randomNumber > answerKeys.length - 1) {
        votes[`/entries/${currentEntry}/votes/${userKey}`] = promptAnswerKey;
      } else {
        votes[`/entries/${currentEntry}/votes/${userKey}`] = answerKeys[randomNumber];
      }
    }
  }
  drawDuoRef.update(votes);
}

export function generateAnswers(drawDuoRef, drawDuoGameState: DrawDuoGame) {
  const {currentEntry, entries, guesses} = drawDuoGameState;
  const currentEntryData: Entry = entries[currentEntry];
  const guessesKeys = Object.keys(currentEntryData.guesses);
  let answers = {};
  let orderNumbers = Array.from({length: guessesKeys.length + 1}).map((item, index) => index + 1);

  guessesKeys.forEach((guessKey) => {
    const key = drawDuoRef.push().key;
    const guess: Guess = guesses[guessKey];
    const randomNumber = randomIntFromInterval(0, orderNumbers.length - 1);
    answers[`/entries/${currentEntry}/answers/${key}`] = {
      order: orderNumbers[randomNumber],
      prompt: false,
      guess: guessKey,
    };
    orderNumbers.splice(randomNumber, 1);
  });

  const answerKey = drawDuoRef.push().key;
  answers[`/entries/${currentEntry}/answers/${answerKey}`] = {
    order: orderNumbers[0],
    prompt: true,
    guess: false,
  };

  drawDuoRef.update(answers);
}

export function revealEntryAnswer(drawDuoRef, drawDuoGameState: DrawDuoGame) {
  const {currentEntry} = drawDuoGameState;
  const currentEntryData: Entry = drawDuoGameState.entries[currentEntry];
  const {currentRevealedAnswerIndex} = currentEntryData;
  drawDuoRef.update({
    [`/entries/${currentEntry}/currentRevealedAnswerIndex`]: currentRevealedAnswerIndex + 1,
  });
}

export function isAnEntryAnswerRemaining(drawDuoGameState: DrawDuoGame): boolean {
  const {currentEntry} = drawDuoGameState;
  const currentEntryData: Entry = drawDuoGameState.entries[currentEntry];
  const {answersTallied, currentRevealedAnswerIndex} = currentEntryData;
  const answerKeys = Object.keys(answersTallied);
  return (currentRevealedAnswerIndex < answerKeys.length - 1);
}