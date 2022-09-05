import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';

export default class FilmsModel {
  #films;

  constructor() {
    this.#films = Array.from({length: MockConstants.FILMS_COUNT}, getFilm);
  }

  get = () => this.#films;
  getById = (id) => this.#films.find((film) => film.id === id);
  
  addToWatchList = (id) => {
    const film = this.getById(id);
    film.isInWatchlist = !film.isInWatchlist;
  };

  addToFavorite = (id) => {
    const film = this.getById(id);
    film.isFavorite = !film.isFavorite;
  };

  markAsWatched = (id) => {
    const film = this.getById(id);
    film.isAlreadyWatched = !film.isAlreadyWatched;
    this.watchingDate = film.isAlreadyWatched ? new Date().toISOString() : null;
  };
}
