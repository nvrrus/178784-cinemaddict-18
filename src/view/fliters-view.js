import AbstractView from '../framework/view/abstract-view';
import { getFiltersTemplate } from '../template/filter-template';

export default class FiltersView extends AbstractView {
  #allFilms;

  /** 
   * @param {Array} allFilms
   * */
  constructor(allFilms) {
    super();
    this.#allFilms = allFilms;
  }
  get template() {
    return getFiltersTemplate(this.#allFilms);
  }
}
