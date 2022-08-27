import dayjs from 'dayjs';
import { getRandomElement, getRandomInteger } from '../utils';
import { MockConstants } from './mock-constants';

const startCommentDate = dayjs('2022-08-01T13:12:34');
const allCommentByIds = new Map();
let currentId = 1;

const getNewCommentDate = () => startCommentDate.add(getRandomInteger(1, 10), 'minutes').toDate();

export const getComment = () => {
  const newComment = {
    id: currentId++,
    comment: getRandomElement(MockConstants.COMMENTS),
    author: getRandomElement(MockConstants.AUTHORS),
    emotion: getRandomElement(MockConstants.EMOJIES),
    date: getNewCommentDate(),
  };
  allCommentByIds.set(newComment.id, newComment);
  return newComment;
};

export const getFilmComments = (film) => film.comments
  .map((commentId) => allCommentByIds.get(commentId));
