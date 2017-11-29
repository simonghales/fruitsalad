import {DrawDuoModel, DrawDuoRefModel, EntryModel, EntryModelState, PairModel, PairModelKeyWrapped} from './models';
import {
  DRAW_DUO_ENTRY_STATE_COMPLETED,
  DRAW_DUO_ENTRY_STATE_GUESSING, DRAW_DUO_ENTRY_STATE_PENDING, DRAW_DUO_ENTRY_STATE_RESULTS,
  DRAW_DUO_ENTRY_STATE_VOTING
} from './constants';
import {getCurrentRoundKey} from './rounds';
import {getNonPromptedPairs} from './users';
import {randomIntFromInterval} from '../../../utils/numbers';

export function isACurrentEntry(drawDuo: DrawDuoModel) {
  return (drawDuo.currentEntry);
}

function nextEntryStep(): void {

}

export function getEntryCurrentState(drawDuo: DrawDuoModel): EntryModelState {
  return drawDuo.entries[drawDuo.currentEntry.key].state;
}

export function setEntry(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const nextEntryKey = getNextEntry(drawDuo, drawDuoRef);
  if (nextEntryKey) {
    drawDuoRef.update({
      currentEntry: {
        index: 0,
        key: nextEntryKey,
      }
    });
  } else {
    console.warn('no next round available');
  }
}

function getNextEntry(drawDuo: DrawDuoModel): string {
  const {entries} = drawDuo;
  const currentRoundKey = getCurrentRoundKey(drawDuo);
  const currentRoundEntries = drawDuo.rounds[currentRoundKey].entries;
  const currentRoundEntriesKeys = Object.keys(currentRoundEntries).sort((keyA, keyB) => {
    return (currentRoundEntries[keyA].order > currentRoundEntries[keyB].order);
  });
  return currentRoundEntriesKeys.find((entryKey) => {
    return entries[entryKey].state === DRAW_DUO_ENTRY_STATE_PENDING;
  });
}

export function isNextEntry(drawDuo: DrawDuoModel): void {
  return (getNextEntry(drawDuo));
}

export function isNextEntryAnswer(drawDuo: DrawDuoModel): void {

}

export function setNextEntryAnswer(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

}

export function getCurrentEntryKey(drawDuo: DrawDuoModel) {
  if (!drawDuo.currentEntry) {
    console.warn('no current entry available');
    return '';
  }
  return drawDuo.currentEntry.key;
}

export function getCurrentEntryData(drawDuo: DrawDuoModel) {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  return drawDuo.entries[currentEntryKey];
}

export function startEntryGuessing(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
    [`entries/${currentEntryKey}/state`]: DRAW_DUO_ENTRY_STATE_GUESSING,
  });
}

const GUESSES = [
  '2 dogs playing piano',
  '2 dogs jumping on a box',
  'animals breaking my piano',
  'the dogs broke my keyboard',
  'i have no idea',
  '2 cats playing keyboard',
];

export function submitEntryTestAnswers(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

  const currentEntryKey = getCurrentEntryKey(drawDuo);

  let answers = {};

  const nonPromptedPairs = getNonPromptedPairs(drawDuo);

  let guessIndex = 0;

  nonPromptedPairs.forEach((pair) => {

    for (let i = 0; i < 2; i++) {
      const key = drawDuoRef.push().key;
      const guess = (guessIndex < GUESSES.length - 1) ? GUESSES[guessIndex] : GUESSES[0];
      guessIndex++;
      answers[`/entries/${currentEntryKey}/answers/${key}`] = {
        text: guess,
        votes: {},
        prompt: false,
        user: pair.users[i],
        order: 0,
        revealOrder: 0,
      };
    }

  });

  drawDuoRef.update(answers);

}

function getPromptAnswerKey(drawDuo: DrawDuoModel) {
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {answers} = currentEntry;
  return Object.keys(answers).find((answerKey) => {
    return (answers[answerKey].prompt);
  });
}

export function submitEntryPromptAnswer(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const key = drawDuoRef.push().key;
  drawDuoRef.update({
    [`/entries/${currentEntryKey}/answers/${key}`]: {
      text: currentEntry.prompt,
      votes: {},
      prompt: true,
      user: false,
      order: 0,
      revealOrder: 0,
    }
  });
}

export function submitEntryTestVotes(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

  const {pairs} = drawDuo;
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {answers} = currentEntry;
  const answerKeys = Object.keys(answers);
  const promptAnswerKey = getPromptAnswerKey(drawDuo);

  let votes = {};

  for (let pairKey in pairs) {
    if (pairKey === currentEntry.pair) continue;
    for (let userKey in pairs[pairKey]) {
      const randomNumber = randomIntFromInterval(0, answerKeys.length + 1);
      if (randomNumber > answerKeys.length - 1) {
        votes[`/entries/${currentEntryKey}/answers/${promptAnswerKey}/votes/${userKey}`] = true;
      } else {
        votes[`/entries/${currentEntryKey}/answers/${answerKeys[randomNumber]}/votes/${userKey}`] = true;
      }
    }
  }

  drawDuoRef.update(votes);

}

export function startEntryVoting(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
    [`entries/${currentEntryKey}/milestones/answersSubmitted`]: true,
    [`entries/${currentEntryKey}/state`]: DRAW_DUO_ENTRY_STATE_VOTING,
  });
}

export function startEntryResults(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
    [`entries/${currentEntryKey}/milestones/votesSubmitted`]: true,
    [`entries/${currentEntryKey}/state`]: DRAW_DUO_ENTRY_STATE_RESULTS,
  });
}

export function setEntryAnswersRevealed(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

}

export function completeEntry(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
    [`entries/${currentEntryKey}/milestones/answersRevealed`]: true,
    [`entries/${currentEntryKey}/state`]: DRAW_DUO_ENTRY_STATE_COMPLETED,
  });
}

export function startNextEntry(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  setEntry(drawDuo, drawDuoRef);
}

export function generateEntries(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel, pairs: {}) {

  const {numberOfRounds} = drawDuo.config;
  const pairKeys = Object.keys(pairs);
  const totalEntries = numberOfRounds * pairKeys.length;
  let entries = {};

  for (let i = 0, len = totalEntries; i < len; i++) {
    const offsettedIndex = getOffsettedIndex(i, pairKeys.length);
    const key = drawDuoRef.push().key;
    entries[key] = generateEntry({
      pair: pairs[pairKeys[offsettedIndex]],
      key: pairKeys[offsettedIndex],
    }, i);
  }

  return entries;

}

export function getOffsettedIndex(index: number, range: number) {
  return index - (Math.floor(index / range) * range);
}

export function generateEntry(pair: PairModelKeyWrapped, index: number) {
  return {
    answers: {},
    currentAnswerIndex: -1,
    drawings: {},
    milestones: {
      answersSubmitted: false,
      answersRevealed: false,
      drawingsSubmitted: false,
      votesSubmitted: false,
    },
    order: index,
    pair: pair.key,
    prompt: Math.random().toString(),
    state: DRAW_DUO_ENTRY_STATE_PENDING,
    votes: {},
  };
}