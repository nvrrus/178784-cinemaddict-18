import { getFilmListTemplate } from '../template/film-list-template';
import AbstractView from './abstrack-view';

export default class FilmListView extends AbstractView {
  #title;
  #isExtra;
  #films;

  constructor(films, title, isExtra) {
    super();
    this.title = title;
    this.isExtra = isExtra;
    this.films = films;
  }

  _innerGetTemlate() {
    return getFilmListTemplate(this.title, this.isExtra);
  }
}
