import AbstractView from '../framework/view/abstract-view';
import { getFiltersTemplate } from '../template/filter-template';

export default class FiltersView extends AbstractView {
  get template() {
    return getFiltersTemplate();
  }
}
