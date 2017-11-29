import {DrawDuoModel, RoundModelState} from './models';
import {
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING, DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS,
  DRAW_DUO_ROUND_STATE_VOTING
} from './constants';

export function isACurrentRound(drawDuo: DrawDuoModel) {
  return (drawDuo.currentRound);
}

export function setRound(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function beginRound(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function completeRound(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function revealRoundResults(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function isANextRound(drawDuo: DrawDuoModel): void {

}

export function nextRound(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

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

function beginRound(drawDuo: DrawDuoModel, drawDuoRef: {}) {

}

export function beginRoundVoting(drawDuo: DrawDuoModel, drawDuoRef: {}) {

}

function nextRoundDrawingStep(drawDuo: DrawDuoModel, drawDuoRef: {}) {

  // confirm that drawings are submitted
  beginRoundVoting(drawDuo, drawDuoRef);

}

export function setRoundDrawingsSubmitted(drawDuo: DrawDuoModel, drawDuoRef: {}) {

}

export function roundDrawingsSubmitted(drawDuo: DrawDuoModel) {
  return true;
}

export function roundDrawingTimerElapsed(drawDuo: DrawDuoModel) {
  return true;
}