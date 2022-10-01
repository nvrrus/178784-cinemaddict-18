import { remove, render, RenderPosition, replace } from '../framework/render';
import FilmsModel from '../model/films';
import FiltersModel from '../model/filter';
import SortsModel from '../model/sorts';
import SortsView from '../view/sorts-view';

export default class SortPresenter {
  /** @type {SortsModel} */
  #sortsModel;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {FiltersModel} */
  #filtersModel;

  /** @type {SortsView} */
  #sortsView;

  #filmsContainer;

  constructor(filmsContainer, sortsModel, filtersModel, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#sortsModel = sortsModel;
    this.#filtersModel = filtersModel;
    this.#filmsModel = filmsModel;

    this.#filtersModel.addObserver(this.#onFilterChanged);
  }

  init() {
    const filterType = this.#filtersModel.getFilterType();
    if (this.#filmsModel.getFilmsCount(filterType) === 0) {
      if (this.#sortsView) {
        remove(this.#sortsView);
        this.#sortsView = null;
      }

      return;
    }

    const sortType = this.#sortsModel.getSortType();
    const newSortsView = new SortsView(sortType);

    if (this.#sortsView) {
      replace(newSortsView, this.#sortsView);
    }
    else {
      render(newSortsView, this.#filmsContainer, RenderPosition.BEFOREBEGIN);
    }

    this.#sortsView = newSortsView;
    this.#sortsView.setSortChangeHandler(this.#onSortChanged);
  }

  #onSortChanged = (sortType) => {
    this.#sortsModel.setSortType(sortType);
    this.init();
  };

  #onFilterChanged = () => {
    this.init();
  };
}
