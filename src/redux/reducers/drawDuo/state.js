import {AppState} from '../../index';

export function getCurrentScreen(state: AppState): string {
  return state.drawDuo.currentScreen;
}