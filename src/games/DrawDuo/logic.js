import {DrawDuoGame, Entry, Guess} from './models';
import {randomIntFromInterval} from '../../utils/numbers';

export function generateRandomOrderOfAnswers(drawDuoGameState: DrawDuoGame): string[] {
  const {currentEntry, entries} = drawDuoGameState;
  const currentEntryData: Entry = entries[currentEntry];
  let talliedAnswers = {};
  for (let userKey in currentEntryData.votes) {
    addVoteToAnswers(talliedAnswers, currentEntryData.votes[userKey]);
  }
  const talliedCount = Object.keys(talliedAnswers).length;
  let talliedIndex = 1;
  for (let answerKey in talliedAnswers) {
    if (answerKey === 'prompt') {
      talliedAnswers[answerKey].order = talliedCount;
    } else {
      talliedAnswers[answerKey].order = talliedIndex;
      talliedIndex++;
    }
  }
  return talliedAnswers;
}

function addVoteToAnswers(answers, answerKey: string) {
  if (answers[answerKey]) {
    answers[answerKey] = {
      count: answers[answerKey].count + 1,
    };
  } else {
    answers[answerKey] = {
      count: 1,
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
  const guessesKeys = Object.keys(currentEntryData.guesses);
  let votes = {};
  for (let pairKey in drawDuoGameState.pairs) {
    if (pairKey === currentEntryData.pair) continue;
    for (let userKey in drawDuoGameState.pairs[pairKey]) {
      const randomNumber = randomIntFromInterval(0, guessesKeys.length + 2);
      if (randomNumber >= guessesKeys.length) {
        votes[`/entries/${currentEntry}/votes/${userKey}`] = 'prompt';
      } else {
        votes[`/entries/${currentEntry}/votes/${userKey}`] = guessesKeys[randomNumber];
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
  const {answers, currentRevealedAnswerIndex} = currentEntryData;
  const answerKeys = Object.keys(answers);
  return (currentRevealedAnswerIndex < answerKeys.length);
}