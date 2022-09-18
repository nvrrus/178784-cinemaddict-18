import { Constants, FilterType } from '../constants/constants.module';
import { compareFilmsByRatingDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListTopRatedPresenter extends AbstractFilmListPresenter {
  _isExtra = true;

  _getFilms() {
    return this._filmsModel.getFilms(FilterType.ALL)
      .sort(compareFilmsByRatingDesc)
      .filter((film) => film.rating > 0)
      .slice(0, Constants.TOP_RATED_FILMS_COUNT);
  }

  _getListTitle() {
    return Constants.TOP_RATED_FILM_LIST_TITLE;
  }
}
