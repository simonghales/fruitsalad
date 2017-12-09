import {SessionModel} from './models';
import {SESSION_STATE_PLAYING} from './constants';

export function sessionGameInPlay(session: SessionModel): boolean {
  return (session.state === SESSION_STATE_PLAYING || session.state === 'playing');
}