import {DrawDuoRefModel, SessionModel} from './models';
import {SESSION_STATE_PENDING, SESSION_STATE_PLAYING, SESSION_STATE_SETTING_UP} from './constants';

export function getSessionState(session: SessionModel): string {
  return (session) ? session.state : '';
}

export function sessionGameInPlay(session: SessionModel): boolean {
  if (!session) {
    console.warn('no session?');
    return false;
  }
  return (session.state === SESSION_STATE_PLAYING);
}

export function setSessionStateSettingUp(sessionRef: DrawDuoRefModel) {
  sessionRef.update({
    drawDuo: true,
    state: SESSION_STATE_SETTING_UP,
  });
}

export function setSessionStatePending(sessionRef: DrawDuoRefModel) {
  sessionRef.update({
    drawDuo: true,
    state: SESSION_STATE_PENDING,
  });
}

export function setSessionStatePlaying(sessionRef: DrawDuoRefModel) {
  sessionRef.update({
    state: SESSION_STATE_PLAYING,
  });
}