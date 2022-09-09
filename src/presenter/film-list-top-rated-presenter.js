import { Constants } from '../constants.module';
import { compareFilmsByRatingDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListTopRatedPresenter extends AbstractFilmListPresenter {
  _getFilms() {
    return this._filmsModel.get()
      .slice()
      .sort(compareFilmsByRatingDesc)
      .slice(0, Constants.TOP_RATED_FILMS_COUNT);
  }
}
