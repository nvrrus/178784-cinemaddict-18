import { getFilm } from '../mock/mock-film';

export default class FilmsModel {
  static compareByRatingDesc = (film1, film2) => film2.rating - film1.rating;
  static compareByCommentsCountDesc = (film1, film2) => film2.comments.length - film1.comments.length;
  #films;

  constructor() {
    this.#films = Array.from({length: 15}, getFilm);
  }

  get = () => this.#films;

}
