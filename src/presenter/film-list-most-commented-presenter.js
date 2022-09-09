import { Constants } from '../constants.module';
import { compareFilmsByCommentsCountDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListMostCommentedPresenter extends AbstractFilmListPresenter {
  _getFilms() {
    return this._filmsModel.get()
      .slice()
      .sort(compareFilmsByCommentsCountDesc)
      .slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
  }
}
