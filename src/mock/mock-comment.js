import moment from 'moment';
import { getRandomInteger } from '../utils';

const startCommentDate = moment('2022-08-01T13:12:34');
const allCommentByIds = new Map();
let currentId = 1;

const getDate = () => startCommentDate.add(getRandomInteger(10, 100), 'seconds').toDate();

const getText = () => {
  const comments = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh',
    'Almost two hours? Seriously?'];

  return comments[getRandomInteger(0, comments.length - 1)];
};

const getEmoji = () => {
  const emojies = ['angry.png', 'puke.png', 'sleeping.png', 'smile.png'];

  return `./images/emoji/${emojies[getRandomInteger(0, emojies.length - 1)]}`;
};

const getAuthor = () => {
  const authors = ['John Doe', 'Tim Macoveev', 'Joe Trumen', 'Harry Pother'];
  return authors[getRandomInteger(0, authors.length - 1)];
};

export const getComment = () => {
  const newComment = {
    id: currentId++,
    text: getText(),
    author: getAuthor(),
    emoji: getEmoji(),
    date: getDate(),
  };
  allCommentByIds.set(newComment.id, newComment);
  return newComment;
};

export const getAllCommentByIds = () => allCommentByIds;
