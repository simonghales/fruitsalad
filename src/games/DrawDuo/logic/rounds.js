import {DrawDuoModel, DrawDuoRefModel, RoundModelState} from './models';
import {
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING, DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS,
  DRAW_DUO_ROUND_STATE_VOTING
} from './constants';
import {randomIntFromInterval} from '../../../utils/numbers';

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

export function getCurrentRoundKey(drawDuo: DrawDuoModel) {
  if (!drawDuo.currentRound) {
    console.warn('no current round available');
    return '';
  }
  return drawDuo.currentRound.key;
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
  return drawDuo.rounds[drawDuo.currentRound.key].state;
}

export function beginRoundVoting(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {

  const currentRound = getCurrentRoundKey(drawDuo);
  drawDuoRef.update({
    [`/rounds/${currentRound}/state`]: DRAW_DUO_ROUND_STATE_VOTING,
  });

}

function nextRoundDrawingStep(drawDuo: DrawDuoModel, drawDuoRef: DrawDuoRefModel) {

  // confirm that drawings are submitted
  beginRoundVoting(drawDuo, drawDuoRef);

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
    return (entries[entryKeyA].order > entries[entryKeyB].order);
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