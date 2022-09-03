import AbstractView from '../framework/view/abstract-view';
import { getCommentTemplate } from '../template/comment-template';

export default class FilmCommentView extends AbstractView {
  #comment;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return getCommentTemplate(this.#comment);
  }
}
