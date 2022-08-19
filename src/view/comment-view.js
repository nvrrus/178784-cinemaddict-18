import { getCommentTemplate } from '../template/comment-template';
import AbstractView from './abstrack-view';

export default class FilmCommentView extends AbstractView {
  constructor(comment) {
    super();
    this.comment = comment;
  }

  innerGetTemlate() {
    return getCommentTemplate(this.comment);
  }
}
