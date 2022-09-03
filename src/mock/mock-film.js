import dayjs from 'dayjs';
import { MockConstants } from './mock-constants';
import { getRandomArray, getRandomElement, getRandomFloat, getRandomInteger } from '../utils/common';
import { createFilmComments } from './mock-comment';

const getRuntime = () => `${getRandomInteger(1, 3)}h ${getRandomFloat(1, 59)}m`;

const getReleaseDate = () => {
  const year = getRandomInteger(1960, 2022);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);
  return dayjs(new Date(year, month, day));
};

const getCountry = () => getRandomElement(MockConstants.COUNTRIES);

let currentId = 0;
export const getFilm = () =>
{
  return {
    id: ++currentId,
    title: getRandomElement(MockConstants.TITLES),
    alternativeTitle: getRandomElement(MockConstants.ALTERNATIVE_TITLES),
    rating: getRandomFloat(1, 10, 1),
    year: getRandomInteger(1951, 2022),
    runtime: getRuntime(),
    genres: getRandomArray(MockConstants.GENRES),
    poster: `./images/posters/${getRandomElement(MockConstants.POSTERS)}`,
    description: getRandomElement(MockConstants.DESCRIPTION),
    director: getRandomElement(MockConstants.DIRECTORS),
    writers: getRandomArray(MockConstants.WRITERS),
    actors: getRandomArray(MockConstants.ACTORS),
    release: {
      date: getReleaseDate(),
      country: getCountry(),
    },
    age: getRandomInteger(0, 18),
    comments: createFilmComments(currentId)
  };
};

