import { Constants } from '../constants.module';
import { render } from '../render';
import { compareCommentsByDate, compareFilmsByCommentsCountDesc, compareFilmsByRatingDesc, isEscapeKey } from '../utils';
import FilmCommentView from '../view/comment-view';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import FilmPopupView from '../view/film-popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  #filmsContainer;
  #filmsModel;
  #commentsModel;
  #bodyElement;
  #footerElement;
  #filmPopupView;

  constructor(filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#bodyElement = document.querySelector(Constants.BODY_SELECTOR);
    this.#footerElement = document.querySelector(Constants.FOOTER_SELECTOR);
  }

  init = () => {
    const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    const allFilms = this.#filmsModel.get();
    const allFilmsView = new FilmListView(allFilms, null, false);

    const topRatedFilms = allFilms.sort(compareFilmsByRatingDesc).slice(0, Constants.TOP_RATED_FILMS_COUNT);
    const topRatedFilmsView = new FilmListView(topRatedFilms, 'Top rated', true);

    const mostCommentedFilms = allFilms.sort(compareFilmsByCommentsCountDesc).slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
    const mostCommentedFilmsView = new FilmListView(mostCommentedFilms, 'Most commented', true);

    this.#filmsContainer = mainContainer.querySelector(Constants.FILMS_SELECTOR);

    this.#renderFilms(allFilmsView, allFilms);
    render(new ShowMoreButtonView(), allFilmsView.element);

    this.#renderFilms(topRatedFilmsView, topRatedFilms);
    this.#renderFilms(mostCommentedFilmsView, mostCommentedFilms);
  };

  #renderFilms(filmsView, films) {
    render(filmsView, this.#filmsContainer);

    const filmsConainer = filmsView.element.querySelector(Constants.FILMS_CONTAINER_SELECTOR);
    for (const film of films) {
      this.#renderFilmCard(film, filmsConainer);
    }
  }

  #renderFilmCard(film, filmsContainer) {
    const filmView = new FilmCardView(film);
    render(filmView, filmsContainer);
    filmView.element.querySelector(Constants.FILM_POSTER_SELECTOR)
      .addEventListener('click', this.#onFilmPosterClick.bind(this, film));
  }

  #onFilmPosterClick(film) {
    this.#filmPopupView = new FilmPopupView(film);
    const commentsListContainer = this.#filmPopupView.element.querySelector(Constants.COMMENTS_CONTAINER_SELECTOR);
    const filmComments = this.#commentsModel.get(film);

    render(this.#filmPopupView, this.#footerElement);
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);

    filmComments
      .sort(compareCommentsByDate)
      .forEach((comment) => render(new FilmCommentView(comment), commentsListContainer));

    this.#filmPopupView.element.querySelector(Constants.FILM_POPUP_CLOSE_BTN_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#removePopup.bind(this));

    document.addEventListener(Constants.KEYDOWN_EVENT_TYPE, (evt) => this.#onPopupEscapeKeyDown.call(this, evt));
  }

  #onPopupEscapeKeyDown(evt) {
    if (isEscapeKey(evt)) {
      this.#removePopup();
    }
  }

  #removePopup() {
    this.#footerElement.removeChild(this.#filmPopupView.element);
    this.#filmPopupView.removeElement();
    this.#bodyElement.classList.remove(Constants.HIDE_OVERFLOW_CLASS);
    document.removeEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
  }
}
