import { CssSelectors, EventTypes } from '../constants/constants.module';
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
    this.element.addEventListener(EventTypes.CLICK, this.#onFilterChangedHandler);
  }

  #onFilterChangedHandler = (evt) => {
    evt.preventDefault();
    const link = evt.target.closest(CssSelectors.FILTER_LINK);
    if (!link) {
      return;
    }
    const clickedFilterType = link.dataset?.type;
    if (!clickedFilterType) {
      throw new Error('Expected data attribute type in filter link');
    }
    if (clickedFilterType === this.#filterType) {
      return;
    }
    this._callback.filterChanged(clickedFilterType);
  };
}
