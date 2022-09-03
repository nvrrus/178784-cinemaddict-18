import Batcher from '../batcher';
import { Constants } from '../constants.module';
import { remove, render } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
import { compareFilmsByCommentsCountDesc, compareFilmsByRatingDesc } from '../utils/film';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  #filmsContainer;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {Array.<Object>} */
  #allFilms;

  /** @type {FilmListView} */
  #allFilmListView;

  /** @type {FilmPopupView} */
  #filmPopupView;

  /** @type {Batcher} */
  #batcher;

  /** @type {ShowMoreButtonView} */
  #showMoreButtonView;

  /** @type {FilmPopupPresenter} */
  #filmPopupPresenter;

  constructor(filmPopupPresenter, filmsModel, filmsContainer) {
    this.#filmPopupPresenter = filmPopupPresenter;
    this.#filmsModel = filmsModel;
    this.#filmsContainer = filmsContainer;
    this.#allFilmListView = new FilmListView(null, false);
    this.#allFilms = this.#filmsModel.get();
  }

  init = () => {
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
    this.#allFilmListView = new FilmListView(Constants.FILM_LIST_EMPTY_TITLE, false);
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
    const topRatedFilmListView = new FilmListView('Top rated', true);
    const topRatedFilms = this.#allFilms.sort(compareFilmsByRatingDesc).slice(0, Constants.TOP_RATED_FILMS_COUNT);
    this.#renderFilmList(topRatedFilmListView, topRatedFilms);
  }

  #renderMostCommented() {
    const mostCommentedFilmListView = new FilmListView('Most commented', true);
    const mostCommentedFilms = this.#allFilms.sort(compareFilmsByCommentsCountDesc).slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
    this.#renderFilmList(mostCommentedFilmListView, mostCommentedFilms);
  }

  #renderFilmList(filmListView, films) {
    render(filmListView, this.#filmsContainer);
    this.#allFilmListView.setClickHandler(this.#onFilmPosterClick);
    this.#renderFilmCards(filmListView, films);
  }

  #onShowMoreClick = () => this.#showMore();

  #showMore() {
    const batch = this.#batcher.nextBatch();

    this.#renderFilmCards(this.#allFilmListView, batch);
    if (!this.#batcher.isAny()) {
      this.#hideShowMoreButton();
    }
  }

  #renderFilmCards(filmListView, films) {
    const filmCardsConainer = filmListView.getFilmCardsContainer();
    for (const film of films) {
      this.#renderFilmCard(film, filmCardsConainer);
    }
  }

  #renderFilmCard(film, filmsContainer) {
    const filmView = new FilmCardView(film);
    render(filmView, filmsContainer);
  }

  #hideShowMoreButton() {
    remove(this.#showMoreButtonView);
    this.#showMoreButtonView.element.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onShowMoreClick);
  }

  #onFilmPosterClick = (evt) => {
    const film = this.#filmsModel.getById(+evt.target.dataset.id);
    this.#filmPopupPresenter.init(film);
  };
}
