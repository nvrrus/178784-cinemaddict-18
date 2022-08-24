import { getFilterPopupTemplate } from '../template/film-popup-template';
import AbstractView from './abstrack-view';

export default class FilmPopupView extends AbstractView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  _innerGetTemlate() {
    return getFilterPopupTemplate(this.#film);
  }
}
