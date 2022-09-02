import AbstractView from '../framework/view/abstract-view';
import { getSortTemplate } from '../template/sort-temlate';

export default class SortView extends AbstractView {
  get template() {
    return getSortTemplate();
  }
}
