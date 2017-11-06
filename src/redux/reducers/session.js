import {Player} from '../../models/player';
import {CURRENT_PLAYER, PLAYERS} from '../../data/dummy';

export interface SessionState {
  sessionCode: string,
  userName: string,
  user: Player,
  players: Player[],
}

const initialSessionState: SessionState = {
  sessionCode: 'SILLYCATS',
  userName: 'Simon',
  user: CURRENT_PLAYER,
  players: PLAYERS,
};

const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_USER_NAME = 'SET_USER_NAME';

export function setSessionCode(sessionCode: string) {
  return {
    type: SET_SESSION_CODE,
    payload: {
      sessionCode,
    }
  };
}

function handleSetSessionCode(state, {sessionCode}: { sessionCode: string }): SessionState {
  return {
    ...state,
    sessionCode,
  }
}

export function setUserName(userName: string) {
  return {
    type: SET_USER_NAME,
    payload: {
      userName,
    }
  };
}

function handleSetUserName(state, {userName}: { userName: string }): SessionState {
  return {
    ...state,
    userName,
  }
}

const ACTION_HANDLERS = {
  [SET_SESSION_CODE]: handleSetSessionCode,
  [SET_USER_NAME]: handleSetUserName,
};

export default function sessionReducer(state: SessionState = initialSessionState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}