import { getFilmCardTemlate } from '../template/film-card-temlate';
import AbstractView from './abstrack-view';

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  innerGetTemlate() {
    return getFilmCardTemlate(this.film);
  }
}
