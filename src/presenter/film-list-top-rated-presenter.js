import { Constants, FilterType, Settings } from '../constants/constants.module';
import { compareFilmsByRatingDesc } from '../utils/film';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListTopRatedPresenter extends AbstractFilmListPresenter {
  _isExtra = true;

  constructor(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    super(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer);
    this._filmsModel.addObserver(this.#onFilmsModelUpdate);
  }

  #onFilmsModelUpdate = (updateType, filmId) => {
    this._updateFilmCard(filmId);
  };

  _getFilms() {
    return this._filmsModel.getFilms(FilterType.ALL)
      .sort(compareFilmsByRatingDesc)
      .filter((film) => film.totalRating > 0)
      .slice(0, Settings.TOP_RATED_FILMS_COUNT);
  }

  _getListTitle() {
    return Constants.TOP_RATED_FILM_LIST_TITLE;
  }
}
