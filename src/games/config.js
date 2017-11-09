import {DRAW_DUO, DRAW_DUO_CONFIG} from './DrawDuo/config';

export interface GameConfig {
  userHeaderDisplayed: boolean,
}

export const ALL_GAMES_CONFIG = {
  [DRAW_DUO]: DRAW_DUO_CONFIG,
};

export function getGameConfig(game: string): GameConfig {
  const config = ALL_GAMES_CONFIG[game];
  return config ? config : null;
}