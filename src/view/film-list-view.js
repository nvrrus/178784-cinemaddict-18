import { Constants } from '../constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilmListTemplate } from '../template/film-list-template';
import { getFilmId } from '../utils/film';

export default class FilmListView extends AbstractView {
  static #objectIndex = 0;
  #listId;
  #title;
  filmViewByFilmIds = new Map();

  constructor(title) {
    super();
    this.#title = title;
    this.#listId = ++FilmListView.#objectIndex;
  }

  get template() {
    return getFilmListTemplate(this.#title, this.#listId);
  }

  getFilmCardListContainer() {
    const cardListSelector = `${Constants.FILM_CARDS_CONTAINER_SELECTOR}--${this.#listId}`;
    return this.element.querySelector(cardListSelector);
  }

  setClickHandlers = (posterClick, controlButtonClick) => {
    this._callback.posterClick = posterClick;
    this._callback.controlButtonClick = controlButtonClick;

    this.getFilmCardListContainer()
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickHandler);
  };

  #onClickHandler = (evt) => {
    evt.preventDefault();

    const filmId = getFilmId(evt.target);
    if (!filmId) {
      return;
    }

    if (evt.target.tagName === Constants.IMG_TAG) {
      this._callback.posterClick(filmId);
      return;
    }

    if (evt.target.tagName !== Constants.BUTTON_TAG) {
      return;
    }

    if (evt.target.classList.contains(Constants.TO_FAVORITE_CARD_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.favorite, filmId);
      return;
    }

    if (evt.target.classList.contains(Constants.TO_WATCH_LIST_CARD_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.watchlist, filmId);
      return;
    }

    if (evt.target.classList.contains(Constants.MARK_WATCHED_CARD_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.watched, filmId);
    }
  };
}
