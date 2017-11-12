import React from 'react';
import DrawDuoDrawing from './components/DrawDuoDrawing/DrawDuoDrawing';

export const DRAW_DUO = 'DRAW_DUO';
export const SCREEN_DRAWING = 'SCREEN_DRAWING';
export const SCREEN_GUESS = 'SCREEN_GUESS';
export const SCREEN_VOTE = 'SCREEN_VOTE';

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