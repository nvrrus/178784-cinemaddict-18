import Batcher from '../batcher';
import { Constants } from '../constants.module';
import { remove, render, replace } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
import { compareFilmsByCommentsCountDesc, compareFilmsByRatingDesc } from '../utils/film';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPopupPresenter from './film-popup-presenter';
import FiltersPresenter from './filters-presenter';

export default class FilmsPresenter {
  #filmsContainer;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {Array.<Object>} */
  #allFilms;

  /** @type {FilmListView} */
  #allFilmListView;

  /** @type {Batcher} */
  #batcher;

  /** @type {ShowMoreButtonView} */
  #showMoreButtonView;

  /** @type {FiltersPresenter} */
  #filtersPresenter;

  /** @type {FilmPopupPresenter} */
  #filmPopupPresenter;

  #filmViewByFilmIds = new Map();

  constructor(filtersPresenter, filmPopupPresenter, filmsModel, filmsContainer) {
    this.#filtersPresenter = filtersPresenter;
    this.#filmPopupPresenter = filmPopupPresenter;
    this.#filmsModel = filmsModel;
    this.#filmsContainer = filmsContainer;
    this.#allFilmListView = new FilmListView(null);
    this.#allFilms = this.#filmsModel.get();
  }

  init = () => {
    this.#filtersPresenter.init(this.#allFilms);
    this.#batcher = new Batcher(this.#allFilms, Constants.FILMS_BATCH_SIZE);
    if (this.#batcher.isAny()) {
      this.#renderNotEmptyFilmList();
    }
    else {
      this.#renderEmptyFilmList();
    }
  };

  #renderNotEmptyFilmList() {
    this.#renderMainFilms();
    this.#renderTopRated();
    this.#renderMostCommented();
  }

  #renderEmptyFilmList() {
    this.#allFilmListView = new FilmListView(Constants.FILM_LIST_EMPTY_TITLE);
    render(this.#allFilmListView, this.#filmsContainer);
  }

  #renderMainFilms() {
    this.#renderFilmList(this.#allFilmListView, this.#batcher.nextBatch());

    if (this.#batcher.isAny()) {
      this.#showMoreButtonView = new ShowMoreButtonView();
      render(this.#showMoreButtonView, this.#allFilmListView.element);
      this.#showMoreButtonView.setClickHandler(this.#onShowMoreClick);
    } else {
      this.#hideShowMoreButton();
    }
  }

  #renderTopRated() {
    const topRatedFilmListView = new FilmListView('Top rated');
    const topRatedFilms = this.#allFilms
      .slice()
      .sort(compareFilmsByRatingDesc)
      .slice(0, Constants.TOP_RATED_FILMS_COUNT);
    this.#renderFilmList(topRatedFilmListView, topRatedFilms);
  }

  #renderMostCommented() {
    const mostCommentedFilmListView = new FilmListView('Most commented');
    const mostCommentedFilms = this.#allFilms
      .slice()
      .sort(compareFilmsByCommentsCountDesc)
      .slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
    this.#renderFilmList(mostCommentedFilmListView, mostCommentedFilms);
  }

  /** 
   * @param {FilmListView} filmListView
   * @param {Array} films 
   * */
  #renderFilmList(filmListView, films) {
    render(filmListView, this.#filmsContainer);
    filmListView.setClickHandlers(this.#onPosterClick, this.#onControlButtonClick);
    this.#renderFilmCards(filmListView, films);
  }

  /** 
   * @param {FilmListView} filmListView 
   * @param {Array} films 
   * */
  #renderFilmCards(filmListView, films) {
    const filmCardsConainer = filmListView.getFilmCardsContainer();
    for (const film of films) {
      this.#renderFilmCard(film, filmCardsConainer);
    }
  }

  #renderFilmCard(film, filmsContainer) {
    const filmView = new FilmCardView(film);
    render(filmView, filmsContainer);
    this.#filmViewByFilmIds.set(film.id, filmView);
  }

  #onShowMoreClick = () => {
    const batch = this.#batcher.nextBatch();
    this.#renderFilmCards(this.#allFilmListView, batch);
    if (!this.#batcher.isAny()) {
      this.#hideShowMoreButton();
    }
  }

  #hideShowMoreButton() {
    remove(this.#showMoreButtonView);
    this.#showMoreButtonView.element.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onShowMoreClick);
  }

  #onPosterClick = (filmId) => {
    const film = this.#filmsModel.getById(filmId);
    this.#filmPopupPresenter.init(film);
    this.#filmPopupPresenter.setClickHandlers(this.#onControlButtonClick);
  };

  #onControlButtonClick = (controlType, filmId) => {
    switch (controlType) {
      case Constants.CONTROL_BTN_TYPE.watchlist:
        this.#filmsModel.addToWatchList(filmId);
        break;
      case Constants.CONTROL_BTN_TYPE.favorite:
        this.#filmsModel.addToFavorite(filmId);
        break;
      case Constants.CONTROL_BTN_TYPE.watched:
        this.#filmsModel.markAsWatched(filmId);
        break;
    }

    this.#filtersPresenter.init(this.#allFilms);
    this.#updateFilmCard(filmId);
  };

  #updateFilmCard(filmId) {
    const film = this.#filmsModel.getById(filmId);
    const newFilmView = new FilmCardView(film);
    const oldFilmView = this.#filmViewByFilmIds.get(filmId);
    replace(newFilmView, oldFilmView);
    oldFilmView.removeElement();
    this.#filmViewByFilmIds.set(filmId, newFilmView);
    this.#filmPopupPresenter.updateFilm(film);
    this.#filmPopupPresenter.setClickHandlers(this.#onControlButtonClick);
  }
}
