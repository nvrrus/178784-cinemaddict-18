import AbstractView from '../framework/view/abstract-view';
import { getCommentTemplate } from '../template/comment-template';

export default class PopupCommentView extends AbstractView {
  #comment;
  #isDeleting;
  constructor(comment, isDeleting) {
    super();
    this.#comment = comment;
    this.#isDeleting = isDeleting;
  }

  get template() {
    return getCommentTemplate(this.#comment, this.#isDeleting);
  }
}
