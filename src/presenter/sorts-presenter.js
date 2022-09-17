import { render, RenderPosition, replace } from '../framework/render';
import FilmsModel from '../model/films';
import SortsModel from '../model/sorts';
import SortsView from '../view/sorts-view';

export default class SortPresenter {
  /** @type {SortsModel} */
  #sortsModel;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {SortsView} */
  #sortsView;

  constructor(sortsModel, filmsModel) {
    this.#sortsModel = sortsModel;
    this.#filmsModel = filmsModel;
  }

  init(beforeContainer) {
    if (this.#filmsModel.isEmpty()) {
      return;
    }

    const newSortsView = new SortsView(this.#sortsModel.getSortType());

    if (this.#sortsView) {
      replace(newSortsView, this.#sortsView);
    }
    else {
      render(newSortsView, beforeContainer, RenderPosition.AFTEREND);
    }

    this.#sortsView = newSortsView;
    this.#sortsView.setSortChangeHandler(this.#onSortChanged);
  }

  #onSortChanged = (sortType) => {
    this.#sortsModel.setSortType(sortType);
    this.init();
  };
}
