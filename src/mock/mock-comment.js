import dayjs from 'dayjs';
import { getRandomElement, getRandomInteger } from '../utils/common';
import { MockConstants } from './mock-constants';

const startCommentDate = dayjs('2022-08-01T13:12:34');
const commentsByFilmIds = new Map();
let currentId = 1;

const getNewCommentDate = () => startCommentDate.add(getRandomInteger(1, 10), 'minutes').toDate();

const getComment = () => {
  const newComment = {
    id: currentId++,
    comment: getRandomElement(MockConstants.COMMENTS),
    author: getRandomElement(MockConstants.AUTHORS),
    emotion: getRandomElement(MockConstants.EMOJIES),
    date: getNewCommentDate(),
  };
  return newComment;
};

export const createFilmComments = (filmId) => {
  const filmComments = Array.from({length: getRandomInteger(1, 15)}, getComment);
  commentsByFilmIds.set(filmId, filmComments);
  return filmComments.map(comment => comment.id);
}

/** @type {Array.<Object>} */
export const getFilmComments = (filmId) => commentsByFilmIds.get(filmId);
