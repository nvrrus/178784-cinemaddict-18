import { getRandomArray, getRandomElement, getRandomFloat, getRandomInteger } from '../utils';
import { getComment } from './mock-comment';
import dayjs from 'dayjs';
import { Constants } from './const';

const getRuntime = () => `${getRandomInteger(1, 3)}h ${getRandomFloat(1, 59)}m`;

const getReleaseDate = () => {
  const year = getRandomInteger(1960, 2022);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);
  return dayjs(new Date(year, month, day));
};

const getCountry = () => getRandomElement(Constants.COUNTRIES);

export const getFilm = () =>
{
  const comments = Array.from({length: getRandomInteger(1, 15)}, getComment);
  return {
    title: getRandomElement(Constants.TITLES),
    alternativeTitle: getRandomElement(Constants.ALTERNATIVE_TITLES),
    rating: getRandomFloat(1, 10, 1),
    year: getRandomInteger(1951, 2022),
    runtime: getRuntime(),
    genres: getRandomArray(Constants.GENRES),
    poster: `./images/posters/${getRandomElement(Constants.POSTERS)}`,
    description: getRandomElement(Constants.DESCRIPTION),
    director: getRandomElement(Constants.DIRECTORS),
    writers: getRandomArray(Constants.WRITERS),
    actors: getRandomArray(Constants.ACTORS),
    release: {
      date: getReleaseDate(),
      country: getCountry(),
    },
    age: getRandomInteger(0, 18),
    comments: comments.map((x) => x.id)
  };
};

