import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';

export default class FilmsModel {
  #films;

  constructor() {
    this.#films = Array.from({length: MockConstants.FILMS_COUNT}, getFilm);
  }

  get = () => this.#films;
  getById = (id) => this.#films.find((film) => film.id === id);
}
