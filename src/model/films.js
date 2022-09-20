import FilmsApiService from '../api/films-api-service';
import { ControlType, FilterType, SortType, UpdateType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import FilterNotSupported from '../errors/filter-not-supported';
import Observable from '../framework/observable';
import CaseHelper from '../utils/case-helper';
import { getUpdateItem } from '../utils/common';
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
    const allFilms = await this.#filmsApiService.getAll();
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
        return films.filter((film) => film.favorite);
      case FilterType.HISTORY:
        return films.filter((film) => film.alreadyWatched);
      case FilterType.WATHCLIST:
        return films.filter((film) => film.watchlist);
      default:
        throw new FilterNotSupported(filterType);
    }
  }

  getById = (id) => this.#allFilms.find((film) => film.id === id);

  getToggleControlUpdateObject = (controlType, filmId) => {
    const film = this.getById(filmId);
    switch (controlType) {
      case ControlType.WATHCLIST:
        return { watchlist: !film.watchlist };
      case ControlType.FAVORITE:
        return { favorite: !film.favorite };
      case ControlType.WATCHED:
        return { alreadyWatched: !film.alreadyWatched };
      default:
        throw new ControlTypeNotSupported(controlType);
    }
  };

  isEmpty() {
    return !this.#allFilms || this.#allFilms.length === 0;
  }

  async updateAsync(id, updateObject) {
    let update = getUpdateItem(this.#allFilms, id, updateObject);
    update = this.#adaptToApi(update);

    let updatedItem = await this.#filmsApiService.update(id, update);
    updatedItem = this.#adaptToClient({...updatedItem});

    const index = this.#allFilms.findIndex((film) => film.id === updatedItem.id);
    this.#allFilms[index] = updatedItem;
    this._notify(UpdateType.FILM_UPDATE, id);
  }

  #adaptToApi(film) {
    const snakeCase = CaseHelper.objectToSnake(film);
    const adaptedFilm = {
      'id': snakeCase.id,
      'comments': snakeCase.comments,
      'film_info': {...snakeCase},
      'user_details': {
        'watchlist': snakeCase.watchlist,
        'already_watched': snakeCase.already_watched,
        'watching_date': snakeCase.watching_date,
        'favorite': snakeCase.favorite
      }
    };

    delete adaptedFilm.film_info.id;
    delete adaptedFilm.film_info.comments;
    delete adaptedFilm.film_info.user_details;

    return adaptedFilm;
  }

  #adaptToClient(film) {
    let adaptedFilm = CaseHelper.objectToCamel(film);
    adaptedFilm = {
      id: film.id,
      ...adaptedFilm,
      ...adaptedFilm.filmInfo,
      ...adaptedFilm.userDetails
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    return adaptedFilm;
  }

  onAddComment(filmId, newCommentId) {
    const film = this.getById(filmId);
    film.comments.push(newCommentId);
    this._notify(UpdateType.FILM_UPDATE, filmId);
  }

  onDeleteComment(filmId, deletedCommentId) {
    const film = this.getById(filmId);
    const index = film.comments?.findIndex((commentId) => commentId === deletedCommentId);
    if (index > -1) {
      film.comments.splice(index, 1);
    }
    this._notify(UpdateType.FILM_UPDATE, filmId);
  }
}
