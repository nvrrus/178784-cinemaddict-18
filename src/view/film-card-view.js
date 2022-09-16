import { Constants } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFilmCardTemlate } from '../template/film-card-temlate';

export default class FilmCardView extends AbstractView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return getFilmCardTemlate(this.#film);
  }

  setPosterClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector(Constants.FILM_POSTER_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
