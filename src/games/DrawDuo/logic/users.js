import {DrawDuoModel, DrawDuoRefModel, EntryModel, PairModel, PairModelWrapper, UserModel} from './models';
import {getCurrentEntryData} from './entries';

const DEFAULT_USERS = [
  {
    image: '',
    name: 'Simon',
  },
  {
    image: '',
    name: 'Chiao',
  },
  {
    image: '',
    name: 'Jono',
  },
  {
    image: '',
    name: 'James',
  },
  {
    image: '',
    name: 'Will',
  },
  {
    image: '',
    name: 'Karen',
  },
  {
    image: '',
    name: 'Geoff',
  },
  {
    image: '',
    name: 'Jeremy',
  }
];

export function getDefaultUsers(drawDuoRef: DrawDuoRefModel) {
  const numberOfUsers = 8;
  let users = {};
  for (let i = 0; i < numberOfUsers; i++) {
    const key = drawDuoRef.push().key;
    users[key] = DEFAULT_USERS[i];
  }
  return users;
}

export function generatePairs(users: {
  [string]: UserModel,
}, drawDuoRef: DrawDuoRefModel): PairModelWrapper {

  const userKeys = Object.keys(users);
  const pairs = [], size = 2;
  let mappedPairs: PairModelWrapper = {};

  while (userKeys.length > 0) {
    pairs.push(userKeys.splice(0, size));
  }

  pairs.forEach((pair) => {
    const key = drawDuoRef.push().key;
    mappedPairs[key] = {
      [pair[0]]: {
        score: 0,
      },
      [pair[1]]: {
        score: 0,
      },
    };
  });

  return mappedPairs;
}

export function getNonPromptedPairs(drawDuo: DrawDuoModel) {
  const {pairs} = drawDuo;
  const currentEntryData: EntryModel = getCurrentEntryData(drawDuo);
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