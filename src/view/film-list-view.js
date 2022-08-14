import { getFilmListTemplate } from '../template/film-list-template';
import AbstractView from './abstrack-view';

export default class FilmListView extends AbstractView {
  constructor(isTitleHidden, isExtra) {
    super();
    this.isTitleHidden = isTitleHidden;
    this.isExtra = isExtra;
  }

  innerGetTemlate() {
    return getFilmListTemplate(this.isTitleHidden, this.isExtra);
  }
}
