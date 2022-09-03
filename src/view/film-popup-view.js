import { Constants } from '../constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilterPopupTemplate } from '../template/film-popup-template';

export default class FilmPopupView extends AbstractView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return getFilterPopupTemplate(this.#film);
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
