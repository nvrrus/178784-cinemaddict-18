import { getFilterPopupTemplate } from '../template/film-popup-template';
import AbstractView from './abstrack-view';

export default class FilmPopupView extends AbstractView {
  innerGetTemlate() {
    return getFilterPopupTemplate();
  }
}
