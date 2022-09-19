import CommentsApiService from '../api/comments-api-service';
import { addComment, deleteComment } from '../mock/mock-comment';

export default class CommentsModel {
  /** @type {CommentsApiService} */
  #commentsApiService;

  #commentsByFilmIds = new Map();

  constructor() {
    this.#commentsApiService = new CommentsApiService();
  }

  /**
   *
   * @param {string} filmId
   * @returns {Array} comments
   */
  getAsync = async (filmId) => {
    if (!this.#commentsByFilmIds.has(filmId)) {
      const comments = await this.#commentsApiService.getCommentsAsync(filmId);
      this.#commentsByFilmIds.set(filmId, comments);
    }

    return this.#commentsByFilmIds.get(filmId).slice();
  };

  delete(filmId, commentId) {
    deleteComment(filmId, commentId);
  }

  add(filmId, newComment) {
    addComment(filmId, newComment);
  }
}
