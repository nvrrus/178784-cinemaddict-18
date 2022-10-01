import { CssSelectors, EventTypes } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilmCardTemlate } from '../template/film-card-temlate';

export default class FilmCardView extends AbstractView {
  #film;
  #isDisabled;
  constructor(film, isDisabled) {
    super();
    this.#film = film;
    this.#isDisabled = isDisabled;
  }

  get template() {
    const res = getFilmCardTemlate(this.#film, this.#isDisabled);
    return res;
  }

  setPosterClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector(CssSelectors.FILM_POSTER)
      .addEventListener(EventTypes.CLICK, this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
