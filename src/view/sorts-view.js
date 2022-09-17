import { Constants, SortType } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';
import { getSortTemplate } from '../template/sorts-temlate';

export default class SortsView extends AbstractView {
  /** @type {SortType} */
  #sortType;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return getSortTemplate(this.#sortType);
  }

  setSortChangeHandler(collback) {
    this._callback.sortTypeChange = collback;
    this.element.addEventListener(Constants.CLICK_EVENT_TYPE, this.#onSortTypeChanged);
  }

  #onSortTypeChanged = (evt) => {
    if (evt.target.tagName !== Constants.LINK_TAG) {
      return;
    }
    const sortType = evt.target.dataset?.id;
    if (sortType) {
      this._callback.sortTypeChange(sortType);
    }
    else {
      throw new Error('Expected sort type id in data attribute');
    }
  };
}
