import { FilterType, UpdateType } from '../constants/constants.module';
import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #filterType = FilterType.ALL;

  getFilterType() {
    return this.#filterType;
  }

  setFilterType(filterType) {
    this.#filterType = filterType;
    this._notify(UpdateType.FILTER_UPDATE, filterType);
  }
}
