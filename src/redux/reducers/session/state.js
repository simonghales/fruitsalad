import {AppState} from '../../index';

export function getUserName(state: AppState): string {
  return state.session.userName;
}