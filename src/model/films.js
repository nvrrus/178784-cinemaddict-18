import FilmsApiService from '../api/films-api-service';
import { ControlType, FilterType, SortType, UpdateType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import FilterNotSupported from '../errors/filter-not-supported';
import Observable from '../framework/observable';
import CaseHelper from '../utils/case-helper';
import { updateItem } from '../utils/common';
import { compareFilmsByRatingDesc, compareFilmsByReleaseDateDesc } from '../utils/film';

export default class FilmsModel extends Observable {
  /** @type {FilmsApiService} */
  #filmsApiService;

  /** @type {Array} */
  #allFilms;

  constructor() {
    super();
    this.#filmsApiService = new FilmsApiService();
  }

  async initAsync() {
    const allFilms = await this.#filmsApiService.getAllAsync();
    this.#allFilms = allFilms.map((film) => this.#adaptToClient(film));
  }

  getFilms(filterType, sortType = SortType.DEFAULT) {
    let films = this.#allFilms.slice();
    switch (sortType) {
      case SortType.DATE:
        films = films.sort(compareFilmsByReleaseDateDesc);
        break;
      case SortType.RATING:
        films = films.sort(compareFilmsByRatingDesc);
        break;
    }

    switch (filterType) {
      case FilterType.ALL:
        return films;
      case FilterType.FAVORITE:
        return films.filter((film) => film.isFavorite);
      case FilterType.HISTORY:
        return films.filter((film) => film.isAlreadyWatched);
      case FilterType.WATHCLIST:
        return films.filter((film) => film.isInWatchlist);
      default:
        throw new FilterNotSupported(filterType);
    }
  }

  getById = (id) => this.#allFilms.find((film) => film.id === id);

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

  isEmpty() {
    return !this.#allFilms || this.#allFilms.length === 0;
  }

  update(id, update) {
    updateItem(this.#allFilms, id, update);
    this._notify(UpdateType.FILM_UPDATE, id);
  }

  #adaptToClient(film) {
    let adaptedFilm = CaseHelper.objectToCamel(film);
    adaptedFilm = {
      ...adaptedFilm,
      ...adaptedFilm.filmInfo,
      ...adaptedFilm.userDetails
    };

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    return adaptedFilm;
  }
}
