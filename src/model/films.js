import { ControlType, FilterType, UpdateType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import FilterNotSupported from '../errors/filter-not-supported';
import Observable from '../framework/observable';
import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';
import { updateItem } from '../utils/common';

export default class FilmsModel extends Observable {
  #films;

  constructor() {
    super();
    this.#films = Array.from({ length: MockConstants.FILMS_COUNT }, getFilm);
  }

  getFilms = (filterType) => {
    switch (filterType) {
      case FilterType.ALL:
        return this.#films.slice();
      case FilterType.FAVORITE:
        return this.#films.filter((film) => film.isFavorite);
      case FilterType.HISTORY:
        return this.#films.filter((film) => film.isAlreadyWatched);
      case FilterType.WATHCLIST:
        return this.#films.filter((film) => film.isInWatchlist);
      default:
        throw new FilterNotSupported(filterType);
    }
  };

  getById = (id) => this.#films.find((film) => film.id === id);

  getToggleControlUpdateObject = (controlType, filmId) => {
    const film = this.getById(filmId);
    switch (controlType) {
      case ControlType.WATHCLIST:
        return { isInWatchlist: !film.isInWatchlist };
      case ControlType.FAVORITE:
        return { isFavorite: !film.isFavorite };
      case ControlType.WATCHED:
        return {
          isAlreadyWatched: !film.isAlreadyWatched,
          watchingDate: film.isAlreadyWatched ? null : new Date().toISOString()
        };
      default:
        throw new ControlTypeNotSupported(controlType);
    }
  };

  update(id, update) {
    updateItem(this.#films, id, update);
    this._notify(UpdateType.FILM_UPDATE, id);
  }
}
