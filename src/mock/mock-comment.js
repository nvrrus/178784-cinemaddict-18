import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomElement, getRandomInteger } from '../utils/common';
import { MockConstants } from './mock-constants';

const startCommentDate = dayjs('2022-08-01T13:12:34');
const commentsByFilmIds = new Map();
const getNewCommentDate = () => startCommentDate.add(getRandomInteger(1, 10), 'minutes').toDate();

const getComment = () => {
  const newComment = {
    id: nanoid(),
    comment: getRandomElement(MockConstants.COMMENTS),
    author: getRandomElement(MockConstants.AUTHORS),
    emotion: getRandomElement(MockConstants.EMOJIES),
    date: getNewCommentDate(),
  };
  return newComment;
};

export const createFilmComments = (filmId) => {
  const filmComments = Array.from({ length: getRandomInteger(1, 15) }, getComment);
  commentsByFilmIds.set(filmId, filmComments);
  return filmComments.map((comment) => comment.id);
};

/** @type {Array.<Object>} */
export const getFilmComments = (filmId) => commentsByFilmIds.get(filmId);

export const deleteComment = (filmId, commentId) => {
  const filmComments = commentsByFilmIds.get(filmId);
  const index = filmComments.findIndex((comment) => comment.id === commentId);
  if (index > -1) {
    filmComments.splice(index, 1);
  }
};

export const addComment = (filmId, newComment) => {
  const filmComments = commentsByFilmIds.get(filmId);
  newComment.id = nanoid();
  newComment.author = getRandomElement(MockConstants.AUTHORS);
  newComment.date = getNewCommentDate();
  filmComments.push({...newComment});
};
