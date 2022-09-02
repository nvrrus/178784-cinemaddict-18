import AbstractView from '../framework/view/abstract-view';
import { getFilmListTemplate } from '../template/film-list-template';

export default class FilmListView extends AbstractView {
  #title;
  #isExtra;

  constructor(title, isExtra) {
    super();
    this.#title = title;
    this.#isExtra = isExtra;
  }

  get template() {
    return getFilmListTemplate(this.#title, this.#isExtra);
  }
}
