import { ControlType, FilterType, SortType, UpdateType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import FilterNotSupported from '../errors/filter-not-supported';
import SortNotSupported from '../errors/sort-not-supported';
import Observable from '../framework/observable';
import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';
import { updateItem } from '../utils/common';
import { compareFilmsByRatingDesc, compareFilmsByReleaseDateDesc } from '../utils/film';

export default class FilmsModel extends Observable {
  #films;

  constructor() {
    super();
    this.#films = Array.from({ length: MockConstants.FILMS_COUNT }, getFilm);
  }

  getFilms = (filterType, sortType = SortType.DEFAULT) => {
    let result = this.#films.slice();
    switch (sortType) {
      case SortType.DEFAULT:
        break;
      case SortType.DATE:
        result = result.sort(compareFilmsByReleaseDateDesc);
        break;
      case SortType.RATING:
        result = result.sort(compareFilmsByRatingDesc);
        break;
      default:
        throw new SortNotSupported(sortType);
    }

    switch (filterType) {
      case FilterType.ALL:
        return result;
      case FilterType.FAVORITE:
        return result.filter((film) => film.isFavorite);
      case FilterType.HISTORY:
        return result.filter((film) => film.isAlreadyWatched);
      case FilterType.WATHCLIST:
        return result.filter((film) => film.isInWatchlist);
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

  any() {
    return this.#films?.length > 0;
  }

  update(id, update) {
    updateItem(this.#films, id, update);
    this._notify(UpdateType.FILM_UPDATE, id);
  }
}
