import { Constants } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getFiltersTemplate } from '../template/filters-template';

export default class FiltersView extends AbstractView {
  #allFilms;
  #filterType;

  /**
   * @param {Array} allFilms
   * @param {string} filterType
   * */
  constructor(allFilms, filterType) {
    super();
    this.#allFilms = allFilms;
    this.#filterType = filterType;
  }

  get template() {
    return getFiltersTemplate(this.#allFilms, this.#filterType);
  }

  setFilterChangedHandler(callback) {
    this._callback.filterChanged = callback;
    this.element.addEventListener(Constants.CLICK_EVENT_TYPE, this.#onFilterChangedHandler);
  }

  #onFilterChangedHandler = (evt) => {
    evt.preventDefault();
    const link = evt.target.closest(Constants.FILTER_LINK_SELECTOR);
    if (!link) {
      return;
    }
    const clickedFilterType = evt.target.dataset?.type;
    if (!clickedFilterType) {
      throw new Error('Expected data attribute type in filter link');
    }
    if (clickedFilterType === this.#filterType) {
      return;
    }
    this._callback.filterChanged(clickedFilterType);
  };
}
