import {DrawDuoModel, DrawDuoRefModel, RoundModel, RoundModelState} from './models';
import {
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING, DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS,
  DRAW_DUO_ROUND_STATE_VOTING
} from './constants';
import {randomIntFromInterval} from '../../../utils/numbers';
import {getUser, getUserEntryKey, getUserPairKey, getUsers} from './users';

export function isACurrentRound(drawDuo: DrawDuoModel) {
  return (drawDuo.currentRound);
}

export function setRound(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const nextRoundKey = getNextRound(drawDuo, drawDuoRef);
  if (nextRoundKey) {
    drawDuoRef.update({
      currentRound: {
        index: 0,
        key: nextRoundKey,
      }
    });
  } else {
    console.warn('no next round available');
  }
}

function getNextRound(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): string {
  const {rounds} = drawDuo;
  let nextRoundKey = null;

  for (let roundKey in rounds) {
    if (rounds[roundKey].state !== DRAW_DUO_ROUND_STATE_COMPLETED) {
      nextRoundKey = roundKey;
      break;
    }
  }

  return nextRoundKey;
}

export function getCurrentRoundKey(drawDuo: DrawDuoModel): string {
  if (!drawDuo.currentRound) {
    console.warn('no current round available');
    return '';
  }
  return drawDuo.currentRound.key;
}

export function getCurrentRound(drawDuo: DrawDuoModel): RoundModel {
  const currentRoundKey = getCurrentRoundKey(drawDuo);
  return (currentRoundKey) ? drawDuo.rounds[currentRoundKey] : null;
}

export function beginRound(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentRound = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`/rounds/${currentRound}/state`]: DRAW_DUO_ROUND_STATE_DRAWING,
  });
}

export function completeRound(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentRound = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`/rounds/${currentRound}/completed`]: true,
    [`/rounds/${currentRound}/state`]: DRAW_DUO_ROUND_STATE_COMPLETED,
  });
}

export function revealRoundResults(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const currentRound = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`rounds/${currentRound}/milestones/entriesRevealed`]: true,
    [`rounds/${currentRound}/state`]: DRAW_DUO_ROUND_STATE_RESULTS,
  })
}

export function isANextRound(drawDuo: DrawDuoModel): boolean {
  return (getNextRound(drawDuo));
}

export function nextRound(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  setRound(drawDuo, drawDuoRef);
}

export function roundAllEntriesCompleted(drawDuo: DrawDuoModel): boolean {
  return false;
}

function setRoundDrawing(): void {

}

function setRoundVoting(): void {

}

function setRoundResults(): void {

}

function isNextRoundAvailable(): boolean {
  return false;
}

export function getRoundCurrentState(drawDuo: DrawDuoModel): RoundModelState {
  if (!drawDuo || !drawDuo.rounds || !drawDuo.currentRound) return null;
  return drawDuo.rounds[drawDuo.currentRound.key].state;
}

export function beginRoundVoting(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {

  const currentRound = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`/rounds/${currentRound}/state`]: DRAW_DUO_ROUND_STATE_VOTING,
  });

}

export function setRoundDrawingsSubmitted(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {

}

export function roundDrawingsSubmitted(drawDuo: DrawDuoModel) {
  const currentRoundKey = getCurrentRoundKey(drawDuo);
  return (drawDuo.rounds[currentRoundKey].milestones.drawingsSubmitted);
}

export function roundDrawingTimerElapsed(drawDuo: DrawDuoModel) {
  return true;
}

export function generateRounds(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel, entries: {}, pairs: {}) {
  const {numberOfRounds} = drawDuo.config;
  const pairKeys = Object.keys(pairs);
  const sortedEntryKeys = Object.keys(entries).sort((entryKeyA: string, entryKeyB: string) => {
    return entries[entryKeyA].order - entries[entryKeyB].order;
  });
  let rounds = {};
  for (let i = 0, len = numberOfRounds; i < len; i++) {
    const roundEntryKeys = sortedEntryKeys.slice((i * pairKeys.length), (pairKeys.length + (i * pairKeys.length)));
    let roundEntries = {};
    roundEntryKeys.forEach((entryKey: string) => {
      roundEntries[entryKey] = {
        order: randomIntFromInterval(0, 10),
      };
    });
    const key = drawDuoRef.push().key;
    rounds[key] = generateRound(roundEntries, i);
  }
  return rounds;
}

export function generateRound(entries: {}, index: number) {
  return {
    completed: false,
    entries: entries,
    milestones: {
      drawingsSubmitted: false,
      entriesRevealed: false,
    },
    order: index,
    state: DRAW_DUO_ROUND_STATE_PENDING,
  };
}

export function submitRoundTestDrawings(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel): void {
  const users = getUsers(drawDuo);
  for (let userKey in users) {
    const offset = randomIntFromInterval(0, 15);
    setTimeout(() => {
      submitRoundUserTestDrawing(userKey, drawDuo, drawDuoRef);
    }, offset * 500);
  }
}

export function submitRoundUserTestDrawing(userKey: string, drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {
  const user = getUser(userKey, drawDuo.users);
  if (!user.bot) return;
  const entryKey = getUserEntryKey(userKey, drawDuo);
  const pairKey = getUserPairKey(userKey, drawDuo);
  const currentRoundKey = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`/rounds/${currentRoundKey}/drawings/${userKey}`]: {
      user: userKey,
      pair: pairKey,
      entry: entryKey,
      image: '',
    }
  });
}

export function submitRoundUserDrawing(image: string, userKey: string, drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {
  const entryKey = getUserEntryKey(userKey, drawDuo);
  const pairKey = getUserPairKey(userKey, drawDuo);
  const currentRoundKey = getCurrentRoundKey(drawDuo);
  if (!entryKey) {
    console.warn('no entry key');
    return;
  }
  if (!pairKey) {
    console.warn('no pair key');
    return;
  }
  if (!currentRoundKey) {
    console.warn('no round key');
    return;
  }
  drawDuoRef.update({
    [`/rounds/${currentRoundKey}/drawings/${userKey}`]: {
      user: userKey,
      pair: pairKey,
      entry: entryKey,
      image: image,
    }
  });
}

export function areAllRoundDrawingsSubmitted(round: RoundModel, drawDuo: DrawDuoModel): boolean {
  const {drawings} = round;
  const {users} = drawDuo;
  if (!drawings || !users) return false;
  let userKeysInDrawings = true;
  for (let userKey in users) {
    if (!drawings[userKey]) {
      userKeysInDrawings = false;
      break;
    }
  }
  return userKeysInDrawings;
}