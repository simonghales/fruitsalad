import {Player} from '../../../models/player';
import {CURRENT_PLAYER, PLAYERS} from '../../../data/dummy';
import {DRAW_DUO} from '../../../games/DrawDuo/constants';

export interface SessionState {
  currentGame: string,
  gameInPlay: boolean,
  joined: boolean,
  sessionCode: string,
  sessionCreated: boolean,
  showSessionBottom: boolean,
  userName: string,
  user: Player,
  players: Player[],
  quitModalOpen: boolean,
}

export const initialSessionState: SessionState = {
  currentGame: DRAW_DUO,
  gameInPlay: false,
  // joined: false,
  joined: true,
  sessionCode: 'SILLYCATS',
  // sessionCreated: false,
  sessionCreated: true,
  showSessionBottom: true,
  userName: 'Simon',
  user: CURRENT_PLAYER,
  players: PLAYERS,
  quitModalOpen: false,
};

const SET_SHOW_SESSION_BOTTOM = 'SET_SHOW_SESSION_BOTTOM';
const SET_GAME_IN_PLAY = 'SET_GAME_IN_PLAY';
const SET_JOINED = 'SET_JOINED';
const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_SESSION_CREATED = 'SET_SESSION_CREATED';
const SET_USER_NAME = 'SET_USER_NAME';
const OPEN_QUIT_MODAL = 'OPEN_QUIT_MODAL';
const CLOSE_QUIT_MODAL = 'CLOSE_QUIT_MODAL';

export function setShowSessionBottom(show: boolean) {
  return {
    type: SET_SHOW_SESSION_BOTTOM,
    payload: {
      show,
    },
  }
}

function handleSetShowSessionBottom(state, {show}): SessionState {
  return {
    ...state,
    showSessionBottom: show,
  }
}

export function openQuitModal() {
  return {
    type: OPEN_QUIT_MODAL,
  }
}

function handleOpenQuitModal(state): SessionState {
  return {
    ...state,
    quitModalOpen: true,
  }
}

export function closeQuitModal() {
  return {
    type: CLOSE_QUIT_MODAL,
  }
}

function handleCloseQuitModal(state): SessionState {
  return {
    ...state,
    quitModalOpen: false,
  }
}

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

export function setSessionCreated() {
  return {
    type: SET_SESSION_CREATED,
  };
}

function handleSetSessionCreated(state): SessionState {
  return {
    ...state,
    sessionCreated: true,
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
  [SET_SHOW_SESSION_BOTTOM]: handleSetShowSessionBottom,
  [OPEN_QUIT_MODAL]: handleOpenQuitModal,
  [CLOSE_QUIT_MODAL]: handleCloseQuitModal,
  [SET_GAME_IN_PLAY]: handleSetGameInPlay,
  [SET_JOINED]: handleSetJoined,
  [SET_SESSION_CODE]: handleSetSessionCode,
  [SET_SESSION_CREATED]: handleSetSessionCreated,
  [SET_USER_NAME]: handleSetUserName,
};

export default function sessionReducer(state: SessionState = initialSessionState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}