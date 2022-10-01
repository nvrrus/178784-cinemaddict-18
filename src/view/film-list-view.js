import { Constants, ControlType, CssClasses, EventTypes, Tags } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilmListTemplate } from '../template/film-list-template';
import { getFilmId } from '../utils/film';

export default class FilmListView extends AbstractView {
  static #objectIndex = 0;
  #listId;
  #title;
  #isExtra;
  #cardListContainer;

  constructor(title, isExtra) {
    super();
    this.#title = title;
    this.#isExtra = isExtra;
    this.#listId = ++FilmListView.#objectIndex;
  }

  get template() {
    return getFilmListTemplate(this.#title, this.#isExtra, this.#listId);
  }

  get cardListContainer() {
    if (this.#cardListContainer) {
      return this.#cardListContainer;
    }
    const cardListSelector = `div[${Constants.ID_DATA_ATTRIBUTE}='${this.#listId}']`;
    this.#cardListContainer = this.element.querySelector(cardListSelector);
    return this.#cardListContainer;
  }

  setClickHandlers = (posterClick, controlButtonClick) => {
    this._callback.posterClick = posterClick;
    this._callback.controlButtonClick = controlButtonClick;

    this.cardListContainer.addEventListener(EventTypes.CLICK, this.#onClickHandler);
  };

  #onClickHandler = (evt) => {
    evt.preventDefault();

    const filmId = getFilmId(evt.target);
    if (!filmId) {
      return;
    }

    if (evt.target.tagName === Tags.IMG) {
      this._callback.posterClick(filmId);
      return;
    }

    if (evt.target.tagName !== Tags.BUTTON) {
      return;
    }

    if (evt.target.classList.contains(CssClasses.TO_FAVORITE_CARD_BTN)) {
      this._callback.controlButtonClick(ControlType.FAVORITE, filmId);
      return;
    }

    if (evt.target.classList.contains(CssClasses.TO_WATCH_LIST_CARD_BTN)) {
      this._callback.controlButtonClick(ControlType.WATHCLIST, filmId);
      return;
    }

    if (evt.target.classList.contains(CssClasses.MARK_WATCHED_CARD_BTN)) {
      this._callback.controlButtonClick(ControlType.WATCHED, filmId);
    }
  };
}
