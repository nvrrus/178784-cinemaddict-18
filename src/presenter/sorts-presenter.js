import { remove, render, RenderPosition } from '../framework/render';
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
    if (this.#sortsView) {
      this.#destroy();
    }

    if (!this.#filmsModel.any()) {
      return;
    }

    this.#sortsView = new SortsView(this.#sortsModel.getSortType());
    render(this.#sortsView, this.#sortsContainer, RenderPosition.AFTERBEGIN);
    this.#sortsView.setSortChangeHandler(this.#onSortChanged);
  }

  #destroy() {
    remove(this.#sortsView);
    this.#sortsView = null;
  }

  #onSortChanged = (sortType) => {
    this.#sortsModel.setSortType(sortType);
    this.init();
  };
}
