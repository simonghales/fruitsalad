import React from 'react';
import DrawDuoDrawing from './components/DrawDuoDrawing/DrawDuoDrawing';
import {
  SCREEN_DRAWING, SCREEN_GUESS, SCREEN_PENDING, SCREEN_RESULTS,
  SCREEN_VOTE
} from './constants';
import DrawDuoGuess from './components/DrawDuoGuess/DrawDuoGuess';
import DrawDuoVote from './components/DrawDuoVote/DrawDuoVote';
import DrawDuoPending from './components/DrawDuoPending/DrawDuoPending';

export const DRAW_DUO_CONFIG = {
  defaults: {
    numberOfRounds: 2,
    drawingTimer: (5 * 1000),
    guessTimer: (2 * 1000),
    voteTimer: (2 * 1000),
    revealTimer: (2 * 1000),
    revealAnswerTimer: (1.5 * 1000),
    sleepTimer: (1 * 1000),
  },
  userHeaderDisplayed: true,
  screens: {
    [SCREEN_PENDING]: () => <DrawDuoPending title='Hang on a sec' subtitle='Watch the TV for instructions'/>,
    [SCREEN_DRAWING]: () => <DrawDuoDrawing/>,
    [SCREEN_GUESS]: () => <DrawDuoGuess/>,
    [SCREEN_VOTE]: () => <DrawDuoVote/>,
    [SCREEN_RESULTS]: () => <DrawDuoPending title='Results!' subtitle='Watch the TV for instructions'/>,
  },
};

export function getComponentFromCurrentScreen(currentScreen: string) {
  return DRAW_DUO_CONFIG.screens[currentScreen]();
}