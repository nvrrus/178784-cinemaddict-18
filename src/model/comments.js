import { getFilmComments } from '../mock/mock-comment';

export default class CommentsModel {
  /** @type {Array} */
  get = (filmId) => getFilmComments(filmId);
}
