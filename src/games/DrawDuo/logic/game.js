import {DrawDuoModel, DrawDuoModelState} from './models';
import {
  DRAW_DUO_STATE_COMPLETED, DRAW_DUO_STATE_INITIATING, DRAW_DUO_STATE_PENDING,
  DRAW_DUO_STATE_PLAYING
} from './constants';

export function getGameCurrentState(drawDuo: DrawDuoModel): DrawDuoModelState {
  return drawDuo.state;
}

export function setGameInitiating(drawDuo: DrawDuoModel, drawDuoRef: {}): void {
}

export function setGamePlaying(drawDuo: DrawDuoModel, drawDuoRef: {}): void {
}

export function setGameCompleted(drawDuo: DrawDuoModel, drawDuoRef: {}): void {

}