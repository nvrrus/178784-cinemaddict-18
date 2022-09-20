import CommentsApiService from '../api/comments-api-service';

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
  async getAsync(filmId) {
    if (!this.#commentsByFilmIds.has(filmId)) {
      const comments = await this.#commentsApiService.getByFilmId(filmId);
      this.#commentsByFilmIds.set(filmId, comments);
    }

    return this.#commentsByFilmIds.get(filmId).slice();
  }

  async deleteAsync(filmId, commentId) {
    await this.#commentsApiService.delete(commentId);
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
   * @returns added comment id
   */
  async addAsync(filmId, newComment) {
    const addedCommentData = await this.#commentsApiService.add(filmId, newComment);
    this.#commentsByFilmIds.set(filmId, addedCommentData.comments.slice());
    return addedCommentData.comments.map((comment) => comment.id);
  }
}
