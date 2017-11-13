import {Player} from '../../../models/player';
import {CURRENT_PLAYER, PLAYERS} from '../../../data/dummy';
import {SCREEN_DRAWING, SCREEN_PENDING} from '../../../games/DrawDuo/constants';

export interface DrawDuoState {
  currentScreen: string,
  pending: boolean,
}

export const initialDrawDuoState: DrawDuoState = {
  currentScreen: SCREEN_DRAWING,
  pending: true,
};

const SET_PENDING = 'SET_PENDING';
const SET_NOT_PENDING = 'SET_NOT_PENDING';
const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';

export function setPending() {
  return {
    type: SET_PENDING,
  };
}

function handleSetPending(state): DrawDuoState {
  return {
    ...state,
    pending: true,
  }
}

export function setNotPending() {
  return {
    type: SET_NOT_PENDING,
  };
}

function handleSetNotPending(state): DrawDuoState {
  return {
    ...state,
    pending: false,
  }
}

export function setCurrentScreen(screen: string) {
  return {
    type: SET_CURRENT_SCREEN,
    payload: {
      screen,
    }
  };
}

function handleSetCurrentScreen(state, {screen}: { screen: string }): DrawDuoState {
  return {
    ...state,
    currentScreen: screen,
  }
}

const ACTION_HANDLERS = {
  [SET_PENDING]: handleSetPending,
  [SET_NOT_PENDING]: handleSetNotPending,
  [SET_CURRENT_SCREEN]: handleSetCurrentScreen,
};

export default function drawDuoReducer(state: DrawDuoState = initialDrawDuoState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}