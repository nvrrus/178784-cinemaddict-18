import { Constants, FilterType } from '../constants/constants.module';
import { render } from '../framework/render';
import CommentsModel from '../model/comments';
import FilmsModel from '../model/films';
import FiltersModel from '../model/filter';
import StatisticsView from '../view/statistics-view';
import FilmListAllPresenter from './film-list-all-presenter';
import FilmListMostCommentedPresenter from './film-list-most-commented-presenter';
import FilmListTopRatedPresenter from './film-list-top-rated-presenter';
import FilmsLoadingPresenter from './films-loading-presenter';
import FiltersPresenter from './filters-presenter';
import PopupPresenter from './popup-presenter';
import ProfilePresenter from './profile-presenter';
import SortsPresenter from './sorts-presenter';

export default class MainPresenter {
  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {HTMLLIElement} */
  #mainContainer;

  /** @type {HTMLLIElement} */
  #footerContainer;

  /** @type {HTMLLIElement} */
  #headerContainer;

  /** @type {ProfilePresenter} */
  #profilePresenter;

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
    this.#filmsModel = filmsModel;
    this.#mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    this.#headerContainer = document.querySelector(Constants.HEADER_SELECTOR);

    this.#footerContainer = document.querySelector(Constants.FOOTER_SELECTOR);
    const filmsContainer = this.#mainContainer.querySelector(Constants.FILMS_SELECTOR);

    this.#profilePresenter = new ProfilePresenter(this.#headerContainer, filmsModel);
    this.#filtersPresenter = new FiltersPresenter(this.#mainContainer, filmsModel, filtersModel);
    this.#sortsPresenter = new SortsPresenter(sortsModel, filmsModel);
    this.#filmsLoaderPresenter = new FilmsLoadingPresenter(filmsContainer, filmsModel);

    const filmPopupPresenter = new PopupPresenter(filmsModel, commentsModel, this.#footerContainer);
    this.#filmListAllPresenter = new FilmListAllPresenter(filmsModel, filtersModel, sortsModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListTopRatedPresenter = new FilmListTopRatedPresenter(filmsModel, filtersModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#filmListMostCommentedPresenter = new FilmListMostCommentedPresenter(filmsModel, filtersModel, this.#filtersPresenter, filmPopupPresenter, filmsContainer);
  }

  init = async () => {
    await this.#filmsLoaderPresenter.init();

    this.#profilePresenter.init();
    this.#filtersPresenter.init();
    const filtersContainer = this.#mainContainer.querySelector(Constants.FILTERS_CONTAINER_SELECTOR);
    this.#sortsPresenter.init(filtersContainer);
    this.#filmListAllPresenter.init();
    this.#filmListTopRatedPresenter.init();
    this.#filmListMostCommentedPresenter.init();

    const filmsCount = this.#filmsModel.getFilmsCount(FilterType.ALL);
    render(new StatisticsView(filmsCount), this.#footerContainer);
  };
}
