import { getFiltersTemplate } from '../template/filter-template';
import AbstractView from './abstrack-view';

export default class FiltersView extends AbstractView {
  innerGetTemlate() {
    return getFiltersTemplate();
  }
}
