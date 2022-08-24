import { getSortTemplate } from '../template/sort-temlate';
import AbstractView from './abstrack-view';

export default class SortView extends AbstractView {
  _innerGetTemlate() {
    return getSortTemplate();
  }
}
