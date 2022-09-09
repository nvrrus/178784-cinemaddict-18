import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';
import { updateItem } from '../utils/common';

export default class FilmsModel {
  #films;

  constructor() {
    this.#films = Array.from({ length: MockConstants.FILMS_COUNT }, getFilm);
  }

  get = () => this.#films;
  getById = (id) => this.#films.find((film) => film.id === id);

  addToWatchList = (filmId) => {
    updateItem(this.#films, filmId, (film) => { film.isInWatchlist = !film.isInWatchlist; } );
  };

  addToFavorite = (filmId) => {
    updateItem(this.#films, filmId, (film) => { film.isFavorite = !film.isFavorite; } );
  };

  markAsWatched = (filmId) => {
    updateItem(this.#films, filmId, (film) => {
      film.isAlreadyWatched = !film.isAlreadyWatched;
      film.watchingDate = film.isAlreadyWatched ? new Date().toISOString() : null;
    });
  };
}
