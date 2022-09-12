import { Constants } from '../constants.module';
import { render, replace } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
// eslint-disable-next-line no-unused-vars
import FilmPopupPresenter from './film-popup-presenter';
// eslint-disable-next-line no-unused-vars
import FiltersPresenter from './filters-presenter';

export default class AbstractFilmListPresenter {
  #filmsContainer;

  /** @type {FilmsModel} */
  _filmsModel;

  /** @type {FilmListView} */
  _filmListView;

  /** @type {FiltersPresenter} */
  #filtersPresenter;

  /** @type {FilmPopupPresenter} */
  #filmPopupPresenter;

  #filmViewByFilmIds = new Map();

  /**
   *
   * @param {FilmsModel} filmsModel
   * @param {FiltersPresenter} filtersPresenter
   * @param {FilmPopupPresenter} filmPopupPresenter
   * @param {HTMLElement} filmsContainer
   */
  constructor(filmsModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    if (new.target === AbstractFilmListPresenter) {
      throw new Error('Cannot instantiate AbstractFilmListPresenter, only concrete one');
    }
    this._filmsModel = filmsModel;
    this.#filtersPresenter = filtersPresenter;
    this.#filmPopupPresenter = filmPopupPresenter;
    this.#filmsContainer = filmsContainer;
  }

  /**
   *
   * @param {string} listTitle
   */
  init = (listTitle = null) => {
    const films = this._getFilms();
    if (films?.length > 0) {
      this._renderNotEmptyFilmList(films, listTitle);
    }
    else {
      this.#renderEmptyFilmList();
    }
  };

  /** @returns {Array} */
  _getFilms() {
    throw new Error('Method must be implemented');
  }

  _renderNotEmptyFilmList(films, listTitle) {
    this._filmListView = new FilmListView(listTitle);
    render(this._filmListView, this.#filmsContainer);
    this._filmListView.setClickHandlers(this.#onPosterClick, this.#onControlButtonClick);
    this._renderFilmCards(films);
  }

  #renderEmptyFilmList() {
    this._filmListView = new FilmListView(Constants.FILM_LIST_EMPTY_TITLE);
  }

  _renderFilmCards(films) {
    films.forEach((film) => this.#filmViewByFilmIds.set(film.id, this.#renderFilmCard(film)));
  }

  #renderFilmCard(film) {
    const filmView = new FilmCardView(film);
    render(filmView, this._filmListView.cardListContainer);
    return filmView;
  }

  #onPosterClick = (filmId) => {
    const film = this._filmsModel.getById(filmId);
    if (this.#filmPopupPresenter.isOpened()) {
      return;
    }
    this.#filmPopupPresenter.init(film);
    this.#filmPopupPresenter.setControlButtonClickHandler(this.#onControlButtonClick);
  };

  #onControlButtonClick = (controlType, filmId) => {
    const updateObject = this._filmsModel.getToggleControlUpdateObject(controlType, filmId);
    this.#filmPopupPresenter.updatePopupState(updateObject);
    this._filmsModel.update(filmId, updateObject);
    this.#filtersPresenter.init(this._filmsModel.get());
    this.#tryUpdateFilmCard(filmId);
  };

  #tryUpdateFilmCard(filmId) {
    if (!this.#filmViewByFilmIds.has(filmId)) {
      return;
    }
    const film = this._filmsModel.getById(filmId);
    const newFilmView = new FilmCardView(film);
    const oldFilmView = this.#filmViewByFilmIds.get(film.id);

    replace(newFilmView, oldFilmView);
    oldFilmView.removeElement();
    this.#filmViewByFilmIds.set(film.id, newFilmView);
  }
}
