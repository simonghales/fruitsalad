import React from 'react';
import DrawDuoDrawing from './components/DrawDuoDrawing/DrawDuoDrawing';

export const DRAW_DUO = 'DRAW_DUO';

export const DRAW_DUO_CONFIG = {
  userHeaderDisplayed: true,
  screens: {
    drawing: () => <DrawDuoDrawing/>,
  },
};

export function getComponentFromCurrentScreen(currentScreen: string) {
  return DRAW_DUO_CONFIG.screens[currentScreen]();
}