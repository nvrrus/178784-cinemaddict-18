import { Constants } from '../constants/constants.module';
import { render } from '../framework/render';
import CommentsModel from '../model/comments';
import FilmsModel from '../model/films';
import FiltersModel from '../model/filter';
import ProfileView from '../view/profile-view';
import FilmListAllPresenter from './film-list-all-presenter';
import FilmListMostCommentedPresenter from './film-list-most-commented-presenter';
import FilmListTopRatedPresenter from './film-list-top-rated-presenter';
import FilmsLoadingPresenter from './films-loading-presenter';
import FiltersPresenter from './filters-presenter';
import PopupPresenter from './popup-presenter';
import SortsPresenter from './sorts-presenter';

export default class MainPresenter {

  /** @type {HTMLLIElement} */
  #mainContainer;

  /** @type {HTMLLIElement} */
  #headerContainer;

  /** @type {FiltersPresenter} */
  #filtersPresenter;

  /** @type {SortsPresenter} */
  #sortsPresenter;

  /** @type {FilmListAllPresenter} */
  #filmListAllPresenter;

  /** @type {FilmListTopRatedPresenter} */
  #filmListTopRatedPresenter;

  /** @type {FilmListMostCommentedPresenter} */
  #filmListMostCommentedPresenter;

  /** @type {FilmsLoadingPresenter} */
  #filmsLoaderPresenter;

  /**
   *
   * @param {FilmsModel} filmsModel
   * @param {CommentsModel} commentsModel
   * @param {FiltersModel} filtersModel
   */
  constructor(filmsModel, commentsModel, filtersModel, sortsModel) {
    this.#mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    this.#headerContainer = document.querySelector(Constants.HEADER_SELECTOR);

    const footerElement = document.querySelector(Constants.FOOTER_SELECTOR);
    const filmsContainer = this.#mainContainer.querySelector(Constants.FILMS_SELECTOR);

    this.#filtersPresenter = new FiltersPresenter(this.#mainContainer, filmsModel, filtersModel);
    this.#sortsPresenter = new SortsPresenter(sortsModel, filmsModel);
    this.#filmsLoaderPresenter = new FilmsLoadingPresenter(filmsContainer, filmsModel);

    const filmPopupPresenter = new PopupPresenter(filmsModel, commentsModel, footerElement);
    this.#filmListAllPresenter = new FilmListAllPresenter(filmsModel, filtersModel, sortsModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListTopRatedPresenter = new FilmListTopRatedPresenter(filmsModel, filtersModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListMostCommentedPresenter = new FilmListMostCommentedPresenter(filmsModel, filtersModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
  }

  init = async () => {
    render(new ProfileView(), this.#headerContainer);

    await this.#filmsLoaderPresenter.init();
    this.#filtersPresenter.init();
    const filtersContainer = this.#mainContainer.querySelector(Constants.FILTERS_CONTAINER_SELECTOR);
    this.#sortsPresenter.init(filtersContainer);
    this.#filmListAllPresenter.init();
    this.#filmListTopRatedPresenter.init();
    this.#filmListMostCommentedPresenter.init();
  };
}
