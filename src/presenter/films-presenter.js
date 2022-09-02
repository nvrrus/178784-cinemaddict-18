import Batcher from '../batcher';
import { Constants } from '../constants.module';
import { remove, render } from '../framework/render';
import { isEscapeKey } from '../utils/common';
import { compareCommentsByDate, compareFilmsByCommentsCountDesc, compareFilmsByRatingDesc } from '../utils/film';
import FilmCommentView from '../view/comment-view';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import FilmPopupView from '../view/film-popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  #filmsContainer;

  /** @type {FilmsModel} */
  #filmsModel;

  #commentsModel;
  #bodyElement;
  #footerElement;
  #allFilms;
  #allFilmsView;
  #topRatedFilms;
  #topRatedFilmsView;
  #mostCommentedFilms;
  #mostCommentedFilmsView;

  /** @type {FilmPopupView} */
  #filmPopupView;

  /** @type {Batcher} */
  #batcher;

  /** @type {ShowMoreButtonView} */
  #showMoreButtonView;

  constructor(filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#bodyElement = document.querySelector(Constants.BODY_SELECTOR);
    this.#footerElement = document.querySelector(Constants.FOOTER_SELECTOR);
    this.#allFilms = this.#filmsModel.get();
  }

  init = () => {
    const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    this.#filmsContainer = mainContainer.querySelector(Constants.FILMS_SELECTOR);
    this.#batcher = new Batcher(this.#allFilms, Constants.FILMS_BATCH_SIZE);
    if (this.#batcher.isAny()) {
      this.#renderNotEmptyFilmList();
    }
    else {
      this.#renderEmptyFilmList();
    }
  };

  #renderNotEmptyFilmList() {
    this.#allFilmsView = new FilmListView(null, false);
    this.#topRatedFilms = this.#allFilms.sort(compareFilmsByRatingDesc).slice(0, Constants.TOP_RATED_FILMS_COUNT);
    this.#topRatedFilmsView = new FilmListView('Top rated', true);
    this.#mostCommentedFilms = this.#allFilms.sort(compareFilmsByCommentsCountDesc).slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
    this.#mostCommentedFilmsView = new FilmListView('Most commented', true);

    render(this.#allFilmsView, this.#filmsContainer);
    this.#renderFilms(this.#allFilmsView, this.#batcher.nextBatch());

    if (this.#batcher.isAny()) {
      this.#showMoreButtonView = new ShowMoreButtonView();
      render(this.#showMoreButtonView, this.#allFilmsView.element);
      this.#showMoreButtonView.setClickHandler(this.#onShowMoreClick);
    } else {
      this.#hideShowMoreButton();
    }

    render(this.#topRatedFilmsView, this.#filmsContainer);
    this.#renderFilms(this.#topRatedFilmsView, this.#topRatedFilms);
    render(this.#mostCommentedFilmsView, this.#filmsContainer);
    this.#renderFilms(this.#mostCommentedFilmsView, this.#mostCommentedFilms);
  }

  #onShowMoreClick = () => this.#showMore();

  #showMore() {
    const batch = this.#batcher.nextBatch();
    this.#renderFilms(this.#allFilmsView, batch);
    if (!this.#batcher.isAny()) {
      this.#hideShowMoreButton();
    }
  }

  #renderEmptyFilmList() {
    this.#allFilmsView = new FilmListView(Constants.FILM_LIST_EMPTY_TITLE, false);
    render(this.#allFilmsView, this.#filmsContainer);
  }

  #renderFilms(filmsView, films) {
    const filmsConainer = filmsView.element.querySelector(Constants.FILMS_CONTAINER_SELECTOR);
    for (const film of films) {
      this.#renderFilmCard(film, filmsConainer);
    }
  }

  #renderFilmCard(film, filmsContainer) {
    const filmView = new FilmCardView(film);
    render(filmView, filmsContainer);
    filmView.setPosterClickHandler(this.#onFilmPosterClick);
  }

  #hideShowMoreButton() {
    remove(this.#showMoreButtonView);
    this.#showMoreButtonView.element.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onShowMoreClick);
  }

  #onFilmPosterClick = (evt) => {
    const film = this.#filmsModel.getById(+evt.target.dataset.id);
    this.#filmPopupView = new FilmPopupView(film);
    const commentsListContainer = this.#filmPopupView.element.querySelector(Constants.COMMENTS_CONTAINER_SELECTOR);
    const filmComments = this.#commentsModel.get(film);

    render(this.#filmPopupView, this.#footerElement);
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);

    filmComments
      .sort(compareCommentsByDate)
      .forEach((comment) => render(new FilmCommentView(comment), commentsListContainer));

    this.#filmPopupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
    document.addEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
  };

  #onPopupEscapeKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#removePopup();
    }
  };

  #onClickPopupCloseBtn = () => {
    this.#removePopup();
  };

  #removePopup() {
    remove(this.#filmPopupView);
    this.#bodyElement.classList.remove(Constants.HIDE_OVERFLOW_CLASS);
    document.removeEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
    document.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickPopupCloseBtn);
  }
}
