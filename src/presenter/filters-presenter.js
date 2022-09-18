import { FilterType } from '../constants/constants.module';
import { render, RenderPosition, replace } from '../framework/render';
import FilmsModel from '../model/films';
import FiltersModel from '../model/filter';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  /** @type {FiltersView} */
  #filtersView;
  #filtersContainer;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {FiltersModel} */
  #filterModel;

  constructor(filtersContainer, filmsModel, filterModel) {
    this.#filtersContainer = filtersContainer;
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
      render(newFiltersView, this.#filtersContainer, RenderPosition.AFTERBEGIN);
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
