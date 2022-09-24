import CommentsApiService from '../api/comments-api-service';

export default class CommentsModel {
  /** @type {CommentsApiService} */
  #commentsApiService;

  #commentsByFilmIds = new Map();

  constructor() {
    this.#commentsApiService = new CommentsApiService();
  }

  /**
   * @param {string} filmId
   * @returns {Array} film comments
   */
  async getAsync(filmId) {
    if (this.#commentsByFilmIds.has(filmId)) {
      return this.#commentsByFilmIds.get(filmId).slice();
    }

    const comments = await this.#commentsApiService.getByFilmIdAsync(filmId);
    this.#commentsByFilmIds.set(filmId, comments);
    return comments.slice();
  }

  /**
   *
   * @param {String} filmId
   * @param {String} commentId
   */
  async deleteAsync(filmId, commentId) {
    await this.#commentsApiService.deleteAsync(commentId);
    const filmComments = this.#commentsByFilmIds.get(filmId);
    const index = filmComments.findIndex((comment) => comment.id === commentId);
    if (index > -1) {
      filmComments.splice(index, 1);
    }
  }

  /**
   *
   * @param {string} filmId Film id to add comment
   * @param {Object} newComment Added comment object
   * @returns updated film comment ids
   */
  async addAsync(filmId, newComment) {
    const addedCommentData = await this.#commentsApiService.addAsync(filmId, newComment);
    this.#commentsByFilmIds.set(filmId, addedCommentData.comments.slice());
    return addedCommentData.comments.map((comment) => comment.id);
  }
}
