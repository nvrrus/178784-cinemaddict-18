import { FilterType } from '../constants/constants.module';
import { render, RenderPosition, replace } from '../framework/render';
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
    const allFilms = this.#filmsModel.getFilms(FilterType.ALL);
    const filterType = this.#filterModel.getFilterType();

    const newFiltersView = new FiltersView(allFilms, filterType);
    if (this.#filtersView) {
      replace(newFiltersView, this.#filtersView);
    }
    else {
      render(newFiltersView, this.#mainContainer, RenderPosition.AFTERBEGIN);
    }
    this.#filtersView = newFiltersView;
    this.#filtersView.setFilterChangedHandler(this.#onFilterChange);

  };

  #onFilterChange = (filterType) => {
    this.#filterModel.setFilterType(filterType);
    this.init();
  };

  #onFilmsModelUpdate = () => {
    this.init();
  };
}
