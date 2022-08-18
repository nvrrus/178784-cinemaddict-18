import { getFilterPopupTemplate } from '../template/film-popup-template';
import AbstractView from './abstrack-view';

export default class FilmPopupView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  innerGetTemlate() {
    return getFilterPopupTemplate(this.film);
  }
}
