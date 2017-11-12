import React from 'react';
import DrawDuoDrawing from './components/DrawDuoDrawing/DrawDuoDrawing';
import {SCREEN_DRAWING, SCREEN_GUESS, SCREEN_VOTE} from './constants';

export const DRAW_DUO_CONFIG = {
  userHeaderDisplayed: true,
  screens: {
    [SCREEN_DRAWING]: () => <DrawDuoDrawing/>,
    [SCREEN_GUESS]: () => <DrawDuoDrawing/>,
    [SCREEN_VOTE]: () => <DrawDuoDrawing/>,
  },
};

export function getComponentFromCurrentScreen(currentScreen: string) {
  return DRAW_DUO_CONFIG.screens[currentScreen]();
}