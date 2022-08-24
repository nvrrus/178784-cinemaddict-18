import { getFilm } from '../mock/mock-film';

export default class FilmsModel {
  #films;

  constructor() {
    this.#films = Array.from({length: 15}, getFilm);
  }

  get = () => this.#films;

}
