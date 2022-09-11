import { Constants } from '../constants.module';
import { render, RenderPosition } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import CommentsModel from '../model/comments';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
import ProfileView from '../view/profile-view';
import SortView from '../view/sort-view';
import FilmListAllPresenter from './film-list-all-presenter';
import FilmListMostCommentedPresenter from './film-list-most-commented-presenter';
import FilmListTopRatedPresenter from './film-list-top-rated-presenter';
import FilmPopupPresenter from './film-popup-presenter';
import FiltersPresenter from './filters-presenter';

export default class MainPresenter {

  /** @type {HTMLLIElement} */
  #mainContainer;

  /** @type {HTMLLIElement} */
  #headerContainer;

  /** @type {FiltersPresenter} */
  #filtersPresenter;

  /** @type {FilmListAllPresenter} */
  #filmListAllPresenter;

  /** @type {FilmListTopRatedPresenter} */
  #filmListTopRatedPresenter;

  /** @type {FilmListMostCommentedPresenter} */
  #filmListMostCommentedPresenter;

  /** @type {FilmsModel} */
  #filmsModel;

  /**
   *
   * @param {FilmsModel} filmsModel
   * @param {CommentsModel} commentsModel
   */
  constructor(filmsModel, commentsModel) {
    this.#mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    this.#headerContainer = document.querySelector(Constants.HEADER_SELECTOR);

    const footerElement = document.querySelector(Constants.FOOTER_SELECTOR);
    const filmsContainer = this.#mainContainer.querySelector(Constants.FILMS_SELECTOR);

    this.#filmsModel = filmsModel;
    this.#filtersPresenter = new FiltersPresenter(this.#mainContainer);

    const filmPopupPresenter = new FilmPopupPresenter(commentsModel, footerElement);
    this.#filmListAllPresenter = new FilmListAllPresenter(filmsModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListTopRatedPresenter = new FilmListTopRatedPresenter(filmsModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListMostCommentedPresenter = new FilmListMostCommentedPresenter(filmsModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
  }

  init = () => {
    render(new ProfileView(), this.#headerContainer);
    render(new SortView(), this.#mainContainer, RenderPosition.AFTERBEGIN);
    this.#filtersPresenter.init(this.#filmsModel.get());
    this.#filmListAllPresenter.init();
    this.#filmListTopRatedPresenter.init(Constants.TOP_RATED_FILM_LIST_TITLE);
    this.#filmListMostCommentedPresenter.init(Constants.MOST_COMMENTED_FILM_LIST_TITLE);
  };
}
