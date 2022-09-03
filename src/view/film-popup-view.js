import { Constants } from '../constants.module';
import AbstractView from '../framework/view/abstract-view';
import CommentsModel from '../model/comments';
import { getFilterPopupTemplate } from '../template/film-popup-template';
import { compareCommentsByDate } from '../utils/film';
import FilmCommentView from './comment-view';

export default class FilmPopupView extends AbstractView {
  #film;

  /** @type {Array} */
  #filmComments;
    
  constructor(film, filmComments) {
    super();
    this.#film = film;
    this.#filmComments = filmComments;
  }

  get template() {
  const commentsTemplate = this.#filmComments
    .slice()
    .sort(compareCommentsByDate)
    .map((comment) => new FilmCommentView(comment).template)
    .join('');

    return getFilterPopupTemplate(this.#film, commentsTemplate);
  }

  setCloseClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector(Constants.FILM_POPUP_CLOSE_BTN_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
