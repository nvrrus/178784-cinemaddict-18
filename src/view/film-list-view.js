import { Constants } from '../constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilmListTemplate } from '../template/film-list-template';

export default class FilmListView extends AbstractView {
  #title;
  #isExtra;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return getFilmListTemplate(this.#title, this.#isExtra);
  }

  getFilmCardsContainer() {
    return this.element.querySelector(Constants.FILM_CARDS_CONTAINER_SELECTOR);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector(Constants.FILM_CARDS_CONTAINER_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
