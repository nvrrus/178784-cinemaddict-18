import { FilterType, UpdateType } from '../constants/constants.module';
import { render, RenderPosition } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
// eslint-disable-next-line no-unused-vars
import FiltersModel from '../model/filter';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  /** @type {FiltersView} */
  #filtersView;
  #mainContainer;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {FiltersModel} */
  #filterModel;

  constructor(mainContainer, filmsModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#onFilterChangeHandler);
    this.#filmsModel.addObserver(this.#onFilmUpdateHandler);
  }

  init = () => {
    if (this.#filtersView) {
      this.#destroy();
    }
    const allFilms = this.#filmsModel.getFilms(FilterType.ALL);
    const filterType = this.#filterModel.getFilterType();
    this.#filtersView = new FiltersView(allFilms, filterType);
    this.#filtersView.setFilterChangedHandler(this.#onFilterChanged);
    render(this.#filtersView, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };

  #onFilterChanged = (filterType) => {
    this.#filterModel.setFilter(filterType);
    this.#filterModel._notify(UpdateType.MAJOR, filterType);
  };

  #onFilterChangeHandler = () => {
    this.init();
  };

  #onFilmUpdateHandler = () => {
    this.init();
  };

  #destroy() {
    this.#filtersView.element.remove();
    this.#filtersView.removeElement();
    this.#filtersView = null;
  }
}
