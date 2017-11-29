import {DrawDuoModel} from './models';

export function isACurrentEntry(drawDuo: DrawDuoModel) {
  return (drawDuo.currentEntry);
}

function nextEntryStep(): void {

}

export function getEntryCurrentState(drawDuo: DrawDuoModel) {
  return drawDuo.entries[drawDuo.currentEntry.key].state;
}

export function setEntry(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function isNextEntry(drawDuo: DrawDuoModel): void {

}

export function isNextEntryAnswer(drawDuo: DrawDuoModel): void {

}

export function setNextEntryAnswer(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function startEntryGuessing(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function startEntryVoting(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function startEntryResults(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function setEntryAnswersRevealed(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function completeEntry(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}

export function startNextEntry(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}