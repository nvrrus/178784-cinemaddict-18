import { Constants, FilterType } from '../constants/constants.module';
import { compareFilmsByCommentsCountDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListMostCommentedPresenter extends AbstractFilmListPresenter {
  _isExtra = true;

  _getFilms() {
    return this._filmsModel.getFilms(FilterType.ALL)
      .sort(compareFilmsByCommentsCountDesc)
      .slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
  }

  _getListTitle() {
    return Constants.MOST_COMMENTED_FILM_LIST_TITLE;
  }

  // eslint-disable-next-line no-unused-vars -- argument not used in this implementation, see abstract implement
  _onFilmsModelUpdate(filmId) {
    this.init();
  }
}
