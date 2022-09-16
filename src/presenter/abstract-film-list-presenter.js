import { FilterType } from '../constants/constants.module';
import { render, RenderPosition, replace } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
// eslint-disable-next-line no-unused-vars
import FiltersModel from '../model/filter';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
// eslint-disable-next-line no-unused-vars
import PopupPresenter from './popup-presenter';
// eslint-disable-next-line no-unused-vars
import FiltersPresenter from './filters-presenter';

export default class AbstractFilmListPresenter {
  #filmsContainer;

  _isExtra = false;
  _renderPlace = RenderPosition.BEFOREEND;

  /** @type {FilmsModel} */
  _filmsModel;

  /** @type {FiltersModel} */
  _filtersModel;

  /** @type {FilmListView} */
  _filmListView;

  /** @type {FiltersPresenter} */
  #filtersPresenter;

  /** @type {PopupPresenter} */
  #filmPopupPresenter;

  #filmViewByFilmIds = new Map();

  /**
   *
   * @param {FilmsModel} filmsModel
   * @param {FiltersModel} filtersModel
   * @param {FiltersPresenter} filtersPresenter
   * @param {PopupPresenter} filmPopupPresenter
   * @param {HTMLElement} filmsContainer
   */
  constructor(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    if (new.target === AbstractFilmListPresenter) {
      throw new Error('Cannot instantiate AbstractFilmListPresenter, only concrete one');
    }
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this.#filtersPresenter = filtersPresenter;
    this.#filmPopupPresenter = filmPopupPresenter;
    this.#filmsContainer = filmsContainer;

    this._filmsModel.addObserver(this.#onFilmUpdate);
  }

  init = () => {
    if (this._filmListView) {
      this.#destroy();
    }

    const films = this._getFilms();
    if (films?.length > 0) {
      this._renderNotEmptyFilmList(films);
    }
    else {
      this._renderEmptyFilmList();
    }
  };

  #onFilmUpdate = (updateType, filmId) => {
    if (this._filtersModel.getFilterType() === FilterType.ALL) {
      this.#tryUpdateFilmCard(filmId);
    }
    else {
      this.init();
    }
  };

  _getListTitle() {
    return null;
  }

  _getEmptyListTitle() {
    return null;
  }

  /** @returns {Array} */
  _getFilms() {
    throw new Error('Method must be implemented');
  }

  _renderNotEmptyFilmList(films) {
    this._filmListView = new FilmListView(this._getListTitle(), this._isExtra);
    render(this._filmListView, this.#filmsContainer, this._renderPlace);
    this._filmListView.setClickHandlers(this.#onPosterClick, this.#onControlButtonClick);
    this._renderFilmCards(films);
  }

  _renderEmptyFilmList() {
    this._filmListView = new FilmListView(this._getEmptyListTitle(), this._isExtra);
    render(this._filmListView, this.#filmsContainer, this._renderPlace);
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
    this._filmsModel.update(filmId, updateObject);
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

  #destroy() {
    this._filmListView.element.remove();
    this._filmListView.removeElement();
    this._filmListView = null;
    this.#filmViewByFilmIds.clear();
  }
}
