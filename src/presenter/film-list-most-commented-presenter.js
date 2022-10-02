import { Constants, FilterType, Settings, UpdateType } from '../constants/constants.module';
import { compareFilmsByCommentsCountDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListMostCommentedPresenter extends AbstractFilmListPresenter {
  _isExtra = true;

  constructor(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    super(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer);
    this._filmsModel.addObserver(this.#onFilmsModelUpdate);
  }

  #onFilmsModelUpdate = (updateType, filmId) => {
    if (updateType === UpdateType.COMMENT_ADD ||
        updateType === UpdateType.COMMENT_DELETE) {
      this.init();
    }
    else {
      this._updateFilmCard(filmId);
    }
  };

  _getFilms() {
    return this._filmsModel.getFilms(FilterType.ALL)
      .sort(compareFilmsByCommentsCountDesc)
      .slice(0, Settings.MOST_COMMENTED_FILMS_COUNT);
  }

  _getListTitle() {
    return Constants.MOST_COMMENTED_FILM_LIST_TITLE;
  }
}
