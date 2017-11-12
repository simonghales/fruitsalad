import React from 'react';
import DrawDuoDrawing from './components/DrawDuoDrawing/DrawDuoDrawing';
import {SCREEN_DRAWING, SCREEN_GUESS, SCREEN_VOTE} from './constants';
import DrawDuoGuess from './components/DrawDuoGuess/DrawDuoGuess';
import DrawDuoVote from './components/DrawDuoVote/DrawDuoVote';

export const DRAW_DUO_CONFIG = {
  userHeaderDisplayed: true,
  screens: {
    [SCREEN_DRAWING]: () => <DrawDuoDrawing/>,
    [SCREEN_GUESS]: () => <DrawDuoGuess/>,
    [SCREEN_VOTE]: () => <DrawDuoVote/>,
  },
};

export function getComponentFromCurrentScreen(currentScreen: string) {
  return DRAW_DUO_CONFIG.screens[currentScreen]();
}