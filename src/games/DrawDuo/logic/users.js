import {
  AnswerModel,
  DrawDuoModel, DrawDuoRefModel, EntryModel, PairModel, PairModelWrapper, PairsModel, RoundModel, SessionModel,
  SessionUserModel,
  UserModel,
  UsersModel
} from './models';
import {doesPairOwnEntry, getCurrentEntryData, getCurrentEntryKey} from './entries';
import {getCurrentRound, getCurrentRoundKey} from './rounds';

const DEFAULT_USERS = [
  {
    image: '',
    name: 'Simon',
    bot: true,
  },
  {
    image: '',
    name: 'Chiao',
    bot: true,
  },
  {
    image: '',
    name: 'Jono',
    bot: true,
  },
  {
    image: '',
    name: 'James',
    bot: true,
  },
  {
    image: '',
    name: 'Will',
    bot: true,
  },
  {
    image: '',
    name: 'Karen',
    bot: true,
  },
  {
    image: '',
    name: 'Geoff',
    bot: true,
  },
  {
    image: '',
    name: 'Jeremy',
    bot: true,
  },
  {
    image: '',
    name: 'Guest 1',
    bot: true,
  },
  {
    image: '',
    name: 'Guest 2',
    bot: true,
  },
  {
    image: '',
    name: 'Guest 3',
    bot: true,
  },
  {
    image: '',
    name: 'Guest 4',
    bot: true,
  }
];

export function getDefaultUsers(drawDuoRef: DrawDuoRefModel) {
  const numberOfUsers = 12;
  // const numberOfUsers = 4;
  let users = {};
  for (let i = 0; i < numberOfUsers; i++) {
    const key = drawDuoRef.push().key;
    users[key] = DEFAULT_USERS[i];
  }
  return users;
}

export function generatePairs(users: {
  [string]: UserModel,
}, drawDuoRef: DrawDuoRefModel, pairSize = 2): PairModelWrapper {

  const userKeys = Object.keys(users);
  // const pairs = [], size = 2;
  const pairs = [], size = pairSize;
  let mappedPairs: PairModelWrapper = {};

  while (userKeys.length > 0) {
    pairs.push(userKeys.splice(0, size));
  }

  pairs.forEach((pair) => {
    const key = drawDuoRef.push().key;
    mappedPairs[key] = {};
    pair.forEach((userKey) => {
      mappedPairs[key][userKey] = {
        score: 0,
      };
    });
  });

  return mappedPairs;
}

export function getNonPromptedPairs(drawDuo: DrawDuoModel) {
  const {pairs} = drawDuo;
  const currentEntryData: EntryModel = getCurrentEntryData(drawDuo);
  if (!currentEntryData) return [];
  const filteredPairs = Object.keys(pairs).filter((pairKey) => {
    return pairKey !== currentEntryData.pair;
  }).map((pairKey) => {
    return {
      users: Object.keys(pairs[pairKey]),
      key: pairKey,
    };
  });
  return filteredPairs;
}

export function getPair(pairKey: string, pairs: PairsModel): PairModel {
  return (pairs && pairs[pairKey]) ? pairs[pairKey] : null;
}

export function getPairUsersKeys(pair: PairModel): string[] {
  return (pair) ? Object.keys(pair) : [];
}

export function getPairs(drawDuo: DrawDuoModel): PairsModel {
  const {pairs} = drawDuo;
  return (pairs) ? pairs : {};
}

export interface WrappedPair {
  key: string,
  pair: PairModel,
}

export function getPairsArrays(drawDuo: DrawDuoModel) {
  const {pairs} = drawDuo;
  if (!pairs) return [];
  return Object.keys(pairs);
}

export function getPairTotalScore(pairKey: string, pairs: PairsModel): number {
  const pair = pairs[pairKey];
  return Object.keys(pair).reduce((score, userKey) => {
    return score + pair[userKey].score;
  }, 0)
}

export function getPairsArraysSortedByScore(drawDuo: DrawDuoModel) {
  const {pairs} = drawDuo;
  if (!pairs) return [];
  return Object.keys(pairs).sort((keyA, keyB) => {
    return getPairTotalScore(keyB, pairs) - getPairTotalScore(keyA, pairs);
  });
}

export function arePairResultsDifferent(pairResultsA, pairResultsB): boolean {
  if (!pairResultsA || !pairResultsB) return true;
  if (Object.keys(pairResultsA).join(',') === Object.keys(pairResultsB).join(',')) {
    return false;
  } else {
    return true;
  }
}

export function getUsers(drawDuo: DrawDuoModel): UsersModel {
  if (!drawDuo) return {};
  const {users} = drawDuo;
  return (users) ? users : {};
}

export function getSessionUsers(session: SessionModel): SessionUserModel {
  if (!session) return {};
  const {users} = session;
  return (users) ? users : {};
}

export function getUser(userKey: string, users: UsersModel): UserModel {
  return (users && users[userKey]) ? users[userKey] : null;
}

export function getUserEntryKey(userKey: string, drawDuo: DrawDuoModel) {
  const currentRound: RoundModel = getCurrentRound(drawDuo);
  const pairKey = getUserPairKey(userKey, drawDuo);
  const {entries} = currentRound;
  return Object.keys(entries).find((entryKey) => {
    return doesPairOwnEntry(pairKey, entryKey, drawDuo);
  });
}

export function getUserPairKey(userKey: string, drawDuo: DrawDuoModel) {
  const {pairs} = drawDuo;
  return Object.keys(pairs).find((pairKey) => {
    return doesPairContainUser(userKey, pairKey, drawDuo);
  });
}

export function doesPairContainUser(userKey: string, pairKey: string, drawDuo: DrawDuoModel): boolean {
  const pair = getPairByKey(pairKey, drawDuo);
  return (Object.keys(pair).find((pairUserKey: string) => {
    return userKey === pairUserKey;
  }));
}

export function getPairByKey(pairKey: string, drawDuo: DrawDuoModel): PairModel {
  const {pairs} = drawDuo;
  return (pairs && pairs[pairKey]) ? pairs[pairKey] : null;
}

export function hasUserSubmittedDrawing(userKey: string, drawDuo: DrawDuoModel): boolean {
  const currentRound = getCurrentRound(drawDuo);
  if (!currentRound) return false;
  const {drawings} = currentRound;
  return (drawings && drawings[userKey]);
}

export function hasUserSubmittedAnswer(userKey: string, drawDuo: DrawDuoModel): boolean {
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) return false;
  const {answers} = currentEntry;
  return (answers && answers[userKey]);
}

export function getCurrentPairKey(drawDuo: DrawDuoModel): string {
  if (!drawDuo) {
    console.warn('drawDuo not available');
    return '';
  }
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) {
    console.warn('no current entry');
    return '';
  }
  return currentEntry.pair;
}

export function getUserAnswer(userKey: string, drawDuo: DrawDuoModel): AnswerModel {
  const currentEntry = getCurrentEntryData(drawDuo);
  const pairKey = getUserPairKey(userKey, drawDuo);
  if (!currentEntry) {
    console.warn('no current entry');
    return null;
  }
  const {answers} = currentEntry;
  const answerKey = Object.keys(answers).find((key) => {
    return (answers[key].user === userKey || pairKey === currentEntry.pair && answers[key].prompt);
  });
  return (answers[answerKey]) ? answers[answerKey] : null;
}

export function getUserVotedAnswer(userKey: string, drawDuo: DrawDuoModel): AnswerModel {
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) {
    console.warn('no current entry');
    return null;
  }
  const {votes} = currentEntry;
  if (!votes) {
    console.warn('no votes');
    return null;
  }
  return (votes[userKey]) ? currentEntry.answers[votes[userKey]] : null;
}

export function getUserCurrentEntryPoints(userKey: string, drawDuo: DrawDuoModel): number {
  const currentEntry = getCurrentEntryData(drawDuo);
  if (!currentEntry) {
    console.warn('no current entry');
    return 0;
  }
  let userScore = 0;
  const userAnswer = getUserAnswer(userKey, drawDuo);
  if (userAnswer) {
    if (userAnswer.votes) {
      for (let key in userAnswer.votes) {
        const pointsValue = (userAnswer.prompt) ? 1000 : 500;
        userScore = userScore + pointsValue;
      }
    }
  }
  const userVotedAnswer = getUserVotedAnswer(userKey, drawDuo);
  if (userVotedAnswer && userVotedAnswer.prompt) {
    userScore = userScore + 1000;
  }
  return userScore;
}

export function getUserCurrentScore(userKey: string, pairKey: string, drawDuo: DrawDuoModel): number {
  pairKey = (pairKey === '') ? getUserPairKey(userKey, drawDuo) : pairKey;
  const {pairs} = drawDuo;
  return (pairs && pairs[pairKey] && pairs[pairKey][userKey]) ? pairs[pairKey][userKey].score : 0;
}

export function getUserDrawing(userKey: string, drawDuo: DrawDuoModel) {
  const currentEntryKey = getCurrentEntryKey(drawDuo);
  const currentRound = getCurrentRound(drawDuo);
  const {drawings} = currentRound;
  if (!drawings) return null;
  const matchedDrawingKey = Object.keys(drawings).find((key) => {
    return (drawings[key].user === userKey && drawings[key].entry === currentEntryKey);
  });
  return (drawings[matchedDrawingKey]) ? drawings[matchedDrawingKey] : null;
}

export function isMinimumNumberOfUsers(users: UsersModel): boolean {
  return (users && Object.keys(users).length > 3);
}

export function isUserHost(userKey: string, session: SessionModel): boolean {
  if (!session) return false;
  return (userKey === session.host);
}

export function isUserJoined(userKey: string, session: SessionModel): boolean {
  if (!session) return false;
  if (!session.users) return false;
  const matchedUser = (Object.keys(session.users).find((key: string) => {
    return userKey === key;
  }));
  return (matchedUser && matchedUser !== '') ? true : false;
}

export function getUsersWithoutDrawings(drawDuo: DrawDuoModel): string[] {
  if (!drawDuo) return [];
  if (!drawDuo.users) return [];
  const {users} = drawDuo;
  let usersWithoutDrawings = [];
  for (let userKey in users) {
    if (!hasUserSubmittedDrawing(userKey, drawDuo)) {
      usersWithoutDrawings.push(userKey);
    }
  }
  return usersWithoutDrawings;
}