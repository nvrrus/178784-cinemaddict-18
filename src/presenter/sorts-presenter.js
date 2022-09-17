import { render, RenderPosition, replace } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
// eslint-disable-next-line no-unused-vars
import SortsModel from '../model/sorts';
import SortsView from '../view/sorts-view';

export default class SortPresenter {
  /** @type {SortsModel} */
  #sortsModel;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {SortsView} */
  #sortsView;

  #sortsContainer;

  constructor(sortsContainer, sortsModel, filmsModel) {
    this.#sortsContainer = sortsContainer;
    this.#sortsModel = sortsModel;
    this.#filmsModel = filmsModel;
  }

  init() {
    if (this.#filmsModel.isEmpty()) {
      return;
    }

    const newSortsView = new SortsView(this.#sortsModel.getSortType());

    if (this.#sortsView) {
      replace(newSortsView, this.#sortsView);
    }
    else {
      render(newSortsView, this.#sortsContainer, RenderPosition.AFTERBEGIN);
    }

    this.#sortsView = newSortsView;
    this.#sortsView.setSortChangeHandler(this.#onSortChanged);
  }

  #onSortChanged = (sortType) => {
    this.#sortsModel.setSortType(sortType);
    this.init();
  };
}
