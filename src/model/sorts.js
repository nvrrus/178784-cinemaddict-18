import { SortType, UpdateType } from '../constants/constants.module';
import Observable from '../framework/observable';

export default class SortsModel extends Observable {
  #sortType = SortType.DEFAULT;

  getSortType() {
    return this.#sortType;
  }

  setSortType(value) {
    this.#sortType = value;
    this._notify(UpdateType.FILTER_UPDATE, value);
  }
}
