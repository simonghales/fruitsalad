import {Player} from '../../models/player';
import {CURRENT_PLAYER, PLAYERS} from '../../data/dummy';

export interface SessionState {
  gameInPlay: boolean,
  joined: boolean,
  sessionCode: string,
  userName: string,
  user: Player,
  players: Player[],
}

const initialSessionState: SessionState = {
  gameInPlay: false,
  joined: false,
  sessionCode: 'SILLYCATS',
  userName: 'Simon',
  user: CURRENT_PLAYER,
  players: PLAYERS,
};

const SET_GAME_IN_PLAY = 'SET_GAME_IN_PLAY';
const SET_JOINED = 'SET_JOINED';
const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_USER_NAME = 'SET_USER_NAME';

export function setGameInPlay() {
  return {
    type: SET_GAME_IN_PLAY,
  };
}

function handleSetGameInPlay(state): SessionState {
  return {
    ...state,
    gameInPlay: true,
  }
}

export function setJoined() {
  return {
    type: SET_JOINED,
  };
}

function handleSetJoined(state): SessionState {
  return {
    ...state,
    joined: true,
  }
}

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
    sessionCode: sessionCode.toUpperCase(),
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
  [SET_GAME_IN_PLAY]: handleSetGameInPlay,
  [SET_JOINED]: handleSetJoined,
  [SET_SESSION_CODE]: handleSetSessionCode,
  [SET_USER_NAME]: handleSetUserName,
};

export default function sessionReducer(state: SessionState = initialSessionState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}