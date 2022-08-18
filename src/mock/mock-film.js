import { getRandomArray, getRandomFloat, getRandomInteger } from '../utils';
import { getComment } from './mock-comment';
import moment from 'moment';

let currentId = 1;

const getTitle = () => {
  const titles = ['Santa Claus Conquers the Martians', 'Popeye the Sailor Meets Sindbad the Sailor',
    'The Man with the Golden Arm', 'The Great Flamarion'];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const getDuration = () => `${getRandomInteger(1, 3)}h ${getRandomFloat(1, 59)}m`;

const getGenres = () => {
  const genres = ['Musical', 'Horror', 'Comedy', 'Drama', 'Thriller', 'Film-Noir', 'Mystery'];
  return getRandomArray(genres);
};

const getPoster = () => {
  const posters = ['the-great-flamarion.jpg', 'santa-claus-conquers-the-martians.jpg', 'made-for-each-other.png',
    'the-dance-of-life.jpg'];
  return `./images/posters/${posters[getRandomInteger(0, posters.length - 1)]}`;
};

const getDescription = () => {
  const descriptions = [
    'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
    'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
    'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…'
  ];
  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};

const getDirector = () => {
  const directors = ['Ivanov Ivan', 'Petrov Piter', 'Muhamed Ali', 'Jimmi Hendrix'];
  return directors[getRandomInteger(0, directors.length)];
};

const getWriters = () => {
  const writers = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Brus Adams', 'Crese Rea'];
  return getRandomArray(writers).join(', ');
};

const getActors = () => {
  const actors = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea', 'Chack Noris', 'Brus Lea'];
  return getRandomArray(actors).join(', ');
};

const getReleaseDate = () => {
  const year = getRandomInteger(1960, 2022);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);
  return moment(new Date(year, month, day)).format('DD MMMM YYYY');
};

const getCountry = () => {
  const countries = ['USA', 'France', 'GB', 'Russia'];
  return countries[getRandomInteger(0, countries.length)];
};

export const getFilm = () =>
{
  const comments = Array.from({length: getRandomInteger(1, 15)}, getComment);
  return {
    id: currentId++,
    title: getTitle(),
    rating: getRandomFloat(1, 10, 1),
    year: getRandomInteger(1951, 2022),
    duration: getDuration(),
    genres: getGenres(),
    poster: getPoster(),
    description: getDescription(),
    director: getDirector(),
    writers: getWriters(),
    actors: getActors(),
    releaseDate: getReleaseDate(),
    country: getCountry(),
    age: getRandomInteger(0, 18),
    commentIds: comments.map((x) => x.id)
  };
};

