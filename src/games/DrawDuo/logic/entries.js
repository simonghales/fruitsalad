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

export function getEntryCurrentState(drawDuo: DrawDuoModel): EntryModelState {
  if (!drawDuo || !drawDuo.currentEntry) return null;
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

export function currentEntryAllAnswers(currentEntry: EntryModel, drawDuo: DrawDuoModel): boolean {
  const {pair} = currentEntry;
  const {pairs} = drawDuo;
  const filteredPairs = Object.keys(pairs).filter((pairKey: string) => {
    return (pairKey !== pair)
  });
  let allSubmitted = true;
  filteredPairs.forEach((pairKey: string) => {
    Object.keys(pairs[pairKey]).forEach((userKey: string) => {
      if (!userHasSubmittedAnswer(userKey, currentEntry)) {
        allSubmitted = false;
      }
    });
  });
  return allSubmitted;
}

export function currentEntryAllVotes(currentEntry: EntryModel, drawDuo: DrawDuoModel): boolean {
  const {pair} = currentEntry;
  const {pairs} = drawDuo;
  const filteredPairs = Object.keys(pairs).filter((pairKey: string) => {
    return (pairKey !== pair)
  });
  let allSubmitted = true;
  filteredPairs.forEach((pairKey: string) => {
    Object.keys(pairs[pairKey]).forEach((userKey: string) => {
      if (!userHasSubmittedVote(userKey, currentEntry)) {
        allSubmitted = false;
      }
    });
  });
  return allSubmitted;
}

export function userHasSubmittedAnswer(userKey: string, currentEntry: EntryModel): boolean {
  const {answers} = currentEntry;
  return Object.keys(answers).map((answerKey) => {
    return answers[answerKey].user;
  }).includes(userKey);
}

export function userHasSubmittedVote(userKey: string, currentEntry: EntryModel): boolean {
  const {votes} = currentEntry;
  if (!votes) return false;
  return Object.keys(votes).includes(userKey);
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

export function isFinalEntryAnswer(drawDuo: DrawDuoModel): boolean {

  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {answersRevealOrder, currentAnswerRevealIndex} = currentEntry;
  return (currentAnswerRevealIndex >= Object.keys(answersRevealOrder).length - 1);

}

export function isNextEntryAnswer(drawDuo: DrawDuoModel): boolean {
  return (!isFinalEntryAnswer(drawDuo));
}

export function setNextEntryAnswer(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {currentAnswerRevealIndex} = currentEntry;
  drawDuoRef.update({
    [`entries/${currentEntryKey}/currentAnswerRevealIndex`]: currentAnswerRevealIndex + 1,
  });

}

export function getCurrentEntryKey(drawDuo: DrawDuoModel) {
  if (!drawDuo.currentEntry) {
    console.warn('no current entry available');
    return '';
  }
  return drawDuo.currentEntry.key;
}

export function getCurrentEntryData(drawDuo: DrawDuoModel): EntryModel {
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

  nonPromptedPairs.forEach((pair) => {

    pair.users.forEach((userKey) => {

      const offset = randomIntFromInterval(0, 10);
      setTimeout(() => {
        submitTestAnswer(userKey, currentEntryKey, drawDuoRef);
      }, offset * 500);

    });

  });

  drawDuoRef.update(answers);

}

function submitTestAnswer(userKey: string, currentEntryKey: string, drawDuoRef: DrawDuoRefModel) {
  const key = userKey;
  const guessIndex = randomIntFromInterval(0, GUESSES.length - 1);
  const guess = (guessIndex < GUESSES.length - 1) ? GUESSES[guessIndex] : GUESSES[0];
  drawDuoRef.update({
    [`/entries/${currentEntryKey}/answers/${key}`]: {
      text: guess,
      votes: {},
      prompt: false,
      user: userKey,
      order: 0,
      revealOrder: 0,
    }
  });
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
  drawDuoRef.update({
    [`/entries/${currentEntryKey}/answers/prompt`]: {
      text: currentEntry.prompt,
      votes: {},
      prompt: true,
      user: false,
      order: 0,
    }
  });
}

export function submitEntryTestVotes(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {

  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {answers} = currentEntry;
  const answerKeys = Object.keys(answers);
  const promptAnswerKey = getPromptAnswerKey(drawDuo);

  const nonPromptedPairs = getNonPromptedPairs(drawDuo);

  let votes = {};

  nonPromptedPairs.forEach((pair) => {

    pair.users.forEach((userKey) => {

      const randomNumber = randomIntFromInterval(0, answerKeys.length + 1);
      if (randomNumber > answerKeys.length - 1) {
        votes[`/entries/${currentEntryKey}/answers/${promptAnswerKey}/votes/${userKey}`] = true;
        votes[`/entries/${currentEntryKey}/votes/${userKey}`] = promptAnswerKey;
      } else {
        votes[`/entries/${currentEntryKey}/answers/${answerKeys[randomNumber]}/votes/${userKey}`] = true;
        votes[`/entries/${currentEntryKey}/votes/${userKey}`] = answerKeys[randomNumber];
      }

    });

  });

  drawDuoRef.update(votes);

}

export function shuffleEntryAnswerRevealOrder(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  const {answers} = currentEntry;

  let orderedAnswers = {};

  for (let answerKey in answers) {
    if (answers[answerKey].votes) {
      orderedAnswers[answerKey] = {
        order: 0,
      }
    }
  }

  let orderNumbers = Array.from({length: Object.keys(orderedAnswers).length}).map((item, index) => index);
  let answersCount = Object.keys(orderedAnswers).length;

  for (let answerKey in orderedAnswers) {
    let order = -1;
    if (answers[answerKey].prompt) {
      order = answersCount - 1;
    } else {
      const orderIndex = randomIntFromInterval(0, orderNumbers.length - 1 - 1); // only the prompt can pick the last index
      order = orderNumbers[orderIndex]; // only the prompt can pick the last index
      orderNumbers.splice(orderIndex, 1);
    }
    orderedAnswers[answerKey] = {
      order: order,
    };
  }

  drawDuoRef.update({
    [`/entries/${currentEntryKey}/answersRevealOrder`]: orderedAnswers,
  });

}

export function shuffleAnswers(drawDuo: DrawDuoModel) {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry = getCurrentEntryData(drawDuo);
  const {answers} = currentEntry;
  let shuffledAnswers = {};
  for (let answerKey in answers) {
    shuffledAnswers[`/entries/${currentEntryKey}/answers/${answerKey}/order`] = randomIntFromInterval(0, 50);
  }
  return shuffledAnswers;
}

export function startEntryVoting(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const shuffledAnswers = shuffleAnswers(drawDuo);
  drawDuoRef.update({
    ...shuffledAnswers,
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
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
    [`entries/${currentEntryKey}/milestones/answersRevealed`]: true,
  });
}

export function areEntryAnswersRevealed(drawDuo: DrawDuoModel): boolean {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentEntry: EntryModel = getCurrentEntryData(drawDuo);
  return currentEntry.milestones.answersRevealed;
}

export function completeEntry(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  drawDuoRef.update({
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
    currentAnswerRevealIndex: -1,
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

export function getEntryByKey(entryKey: string, drawDuo: DrawDuoModel): EntryModel {
  const {entries} = drawDuo;
  return (entries && entries[entryKey]) ? entries[entryKey] : null;
}

export function doesPairOwnEntry(pairKey: string, entryKey: string, drawDuo: DrawDuoModel): boolean {
  const entry = getEntryByKey(entryKey, drawDuo);
  return (entry.pair === pairKey);
}

export function getAnswers(drawDuo: DrawDuoModel) {
  const currentEntry = getCurrentEntryData(drawDuo);
  return (currentEntry) ? currentEntry.answers : {};
}

export function hasAnswerBeenRevealed(answerKey: string, drawDuo: DrawDuoModel): boolean {
  if (!drawDuo) return false;
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) return false;
  const {currentAnswerRevealIndex} = currentEntry;
  const sortedRevealAnswersOrder = getSortedRevealAnswersOrder(currentEntry);
  const answerIndex = sortedRevealAnswersOrder.findIndex(key => key === answerKey);
  return (answerIndex !== -1 && answerIndex <= currentAnswerRevealIndex);
}

export function isAnswerBeingRevealed(answerKey: string, drawDuo: DrawDuoModel): boolean {
  if (!drawDuo) return false;
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) return false;
  const {currentAnswerRevealIndex} = currentEntry;
  const sortedRevealAnswersOrder = getSortedRevealAnswersOrder(currentEntry);
  const answerIndex = sortedRevealAnswersOrder.findIndex(key => key === answerKey);
  return (answerIndex === currentAnswerRevealIndex);
}

export function getSortedRevealAnswersOrder(entry: EntryModel) {
  const {answersRevealOrder} = entry;
  return (answersRevealOrder) ? Object.keys(answersRevealOrder).sort((keyA, keyB) => {
    return answersRevealOrder[keyA].order - answersRevealOrder[keyB].order;
  }) : [];
}

export function getSortedRevealAnswers(drawDuo: DrawDuoModel) {
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) return [];
  const {answersRevealOrder, answers} = currentEntry;
  return (answersRevealOrder) ? Object.keys(answersRevealOrder).sort((keyA, keyB) => {
    return answersRevealOrder[keyA].order - answersRevealOrder[keyB].order;
  }).map((key) => {
    return {
      answer: answers[key],
      key: key,
    };
  }) : [];
}