import { addComment, deleteComment, getFilmComments } from '../mock/mock-comment';

export default class CommentsModel {
  /**
   *
   * @param {string} filmId
   * @returns {Array} comments
   */
  get = (filmId) => getFilmComments(filmId).slice();

  delete(filmId, commentId) {
    deleteComment(filmId, commentId);
  }

  add(filmId, newComment) {
    addComment(filmId, newComment);
  }
}
