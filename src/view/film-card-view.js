import { getFilmCardTemlate } from '../template/film-card-temlate';
import AbstractView from './abstrack-view';

export default class FilmCardView extends AbstractView {
  innerGetTemlate() {
    return getFilmCardTemlate();
  }
}
