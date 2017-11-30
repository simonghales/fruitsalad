import {
  DRAW_DUO_ENTRY_STATE_COMPLETED,
  DRAW_DUO_ENTRY_STATE_GUESSING,
  DRAW_DUO_ENTRY_STATE_PENDING, DRAW_DUO_ENTRY_STATE_RESULTS, DRAW_DUO_ENTRY_STATE_VOTING,
  DRAW_DUO_ROUND_STATE_COMPLETED,
  DRAW_DUO_ROUND_STATE_DRAWING, DRAW_DUO_ROUND_STATE_PENDING, DRAW_DUO_ROUND_STATE_RESULTS,
  DRAW_DUO_ROUND_STATE_VOTING, DRAW_DUO_STATE_COMPLETED, DRAW_DUO_STATE_INITIATING, DRAW_DUO_STATE_PENDING,
  DRAW_DUO_STATE_PLAYING
} from './constants';

export interface DrawDuoRefModel {
  push(): void,

  update(): void,

  set(): void,
}

export interface UserModel {
  name: string,
  image: string,
}

export interface PairModelWrapper {
  [string]: PairModel,
}

export interface PairModel {
  //userKey
  [string]: {
    score: number,
  },
}

export interface PairModelKeyWrapped {
  key: string,
  pair: PairModel,
}

export type RoundModelState =
  DRAW_DUO_ROUND_STATE_PENDING
  | DRAW_DUO_ROUND_STATE_DRAWING
  | DRAW_DUO_ROUND_STATE_VOTING
  | DRAW_DUO_ROUND_STATE_RESULTS
  | DRAW_DUO_ROUND_STATE_COMPLETED;

export interface RoundModel {
  completed: boolean,
  entries: {
    //entryKey
    [string]: {
      order: number,
    },
  },
  milestones: {
    drawingsSubmitted: boolean,
    entriesRevealed: boolean,
  },
  order: number,
  state: RoundModelState,
}

export interface ConfigModel {
  numberOfRounds: 2,
  timers: {
    drawing: number,
    guess: number,
    vote: number,
    reveal: number,
    revealAnswer: number,
    revealFinalAnswer: number,
    completedEntry: number,
    sleep: number,
  },
}

export type EntryModelState =
  DRAW_DUO_ENTRY_STATE_PENDING
  | DRAW_DUO_ENTRY_STATE_GUESSING
  | DRAW_DUO_ENTRY_STATE_VOTING
  | DRAW_DUO_ENTRY_STATE_RESULTS
  | DRAW_DUO_ENTRY_STATE_COMPLETED;

export interface EntryModel {
  answers: {
    [string]: AnswerModel,
  },
  answersRevealOrder: {
    [string]: {
      order: number,
    },
  },
  currentAnswerRevealIndex: number,
  drawings: {
    // userKey : string
    [string]: string,
  },
  milestones: {
    answersSubmitted: boolean,
    answersRevealed: boolean,
    drawingsSubmitted: boolean,
    votesSubmitted: boolean,
  },
  order: number,
  pair: string, // pairKey
  prompt: string,
  state: EntryModelState,
  votes: {
    // userKey : answerKey
    [string]: string,
  },
}

export interface AnswerModel {
  text: string,
  votes: {
    // userKey: true
    [string]: boolean,
  },
  prompt?: boolean,
  user?: string,
  order?: number,
}

export type DrawDuoModelState =
  DRAW_DUO_STATE_PENDING
  | DRAW_DUO_STATE_INITIATING
  | DRAW_DUO_STATE_PLAYING
  | DRAW_DUO_STATE_COMPLETED;

export interface DrawDuoModel {
  config: ConfigModel,
  currentEntry: {
    index: number,
    key: string,
  },
  currentRound: {
    index: number,
    key: string,
  },
  currentHost: string, // userKey
  entries: {
    [string]: EntryModel,
  },
  users: {
    [string]: UserModel,
  },
  pairs: {
    [string]: PairModel,
  },
  rounds: {
    [string]: RoundModel,
  },
  state: DrawDuoModelState,
  timer: string,
}