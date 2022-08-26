import { getFilmListTemplate } from '../template/film-list-template';
import AbstractView from './abstrack-view';

export default class FilmListView extends AbstractView {
  #title;
  #isExtra;

  constructor(title, isExtra) {
    super();
    this.#title = title;
    this.#isExtra = isExtra;
  }

  _innerGetTemlate() {
    return getFilmListTemplate(this.#title, this.#isExtra);
  }
}
