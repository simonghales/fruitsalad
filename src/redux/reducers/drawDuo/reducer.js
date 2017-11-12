import {Player} from '../../../models/player';
import {CURRENT_PLAYER, PLAYERS} from '../../../data/dummy';
import {DRAW_DUO, SCREEN_DRAWING} from '../../../games/DrawDuo/config';

export interface DrawDuoState {
  currentScreen: string,
}

export const initialDrawDuoState: DrawDuoState = {
  currentScreen: SCREEN_DRAWING,
};

const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';

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
  [SET_CURRENT_SCREEN]: handleSetCurrentScreen,
};

export default function drawDuoReducer(state: DrawDuoState = initialDrawDuoState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}