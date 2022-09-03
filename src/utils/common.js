import { Constants } from '../constants.module';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

const getRandomElement = (source) => source[getRandomInteger(0, source.length - 1)];

const getRandomArray = (sourceArray) => {
  const count = getRandomInteger(1, sourceArray.length);
  const resultSet = new Set();
  for(let i = 0; i < count; i++) {
    resultSet.add(sourceArray[getRandomInteger(0, sourceArray.length - 1)]);
  }
  return Array.from(resultSet);
};

const isEscapeKey = (evt) => evt.key === Constants.ESCAPE_KEY;

export { getRandomInteger, getRandomFloat, getRandomElement, getRandomArray, isEscapeKey };
