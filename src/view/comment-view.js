import { getCommentTemplate } from '../template/comment-template';
import AbstractView from './abstrack-view';

export default class FilmCommentView extends AbstractView {
  #comment;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  _innerGetTemlate() {
    return getCommentTemplate(this.#comment);
  }
}
