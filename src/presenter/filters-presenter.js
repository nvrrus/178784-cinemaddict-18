import { FilterType } from '../constants/constants.module';
import { remove, render, RenderPosition } from '../framework/render';
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

    this.#filmsModel.addObserver(this.#onFilmsModelUpdate);
  }

  init = () => {
    if (this.#filtersView) {
      this.#destroy();
    }
    const allFilms = this.#filmsModel.getFilms(FilterType.ALL);
    const filterType = this.#filterModel.getFilterType();
    this.#filtersView = new FiltersView(allFilms, filterType);
    this.#filtersView.setFilterChangedHandler(this.#onFilterChange);
    render(this.#filtersView, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };

  #onFilterChange = (filterType) => {
    this.#filterModel.setFilterType(filterType);
    this.init();
  };

  #onFilmsModelUpdate = () => {
    this.init();
  };

  #destroy() {
    remove(this.#filtersView);
    this.#filtersView = null;
  }
}
