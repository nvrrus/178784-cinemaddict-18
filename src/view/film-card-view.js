import { getFilmCardTemlate } from '../template/film-card-temlate';
import AbstractView from './abstrack-view';

export default class FilmCardView extends AbstractView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  _innerGetTemlate() {
    return getFilmCardTemlate(this.#film);
  }
}
