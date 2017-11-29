import {DrawDuoModel, DrawDuoRefModel, EntryModel, PairModel, PairModelWrapper, UserModel} from './models';
import {getCurrentEntryData} from './entries';

export function getDefaultUsers() {
  return {
    0: {
      image: '',
      name: 'Simon',
    },
    1: {
      image: '',
      name: 'Chiao',
    },
    2: {
      image: '',
      name: 'Jono',
    },
    3: {
      image: '',
      name: 'James',
    },
    4: {
      image: '',
      name: 'Will',
    },
    5: {
      image: '',
      name: 'Karen',
    },
    6: {
      image: '',
      name: 'Geoff',
    },
    7: {
      image: '',
      name: 'Jeremy',
    },
  }
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