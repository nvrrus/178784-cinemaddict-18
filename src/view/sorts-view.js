import { EventTypes, SortType, Tags } from '../constants/constants.module';
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
    this.element.addEventListener(EventTypes.CLICK, this.#onSortTypeChanged);
  }

  #onSortTypeChanged = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== Tags.LINK) {
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
