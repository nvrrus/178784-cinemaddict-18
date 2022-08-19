import { getFilmComments } from '../mock/mock-comment';
import { getDateSeconds } from '../utils';

export default class CommentsModel {
  static compareByDate = (comment1, comment2) => getDateSeconds(comment1.date) - getDateSeconds(comment2.date);

  get = (film) => getFilmComments(film);
}
