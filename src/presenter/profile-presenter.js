import { FilterType, UpdateType } from '../constants/constants.module';
import { render, replace } from '../framework/render';
import FilmsModel from '../model/films';
import ProfileView from '../view/profile-view';

export default class ProfilePresenter {
  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {ProfileView} */
  #profileView;

  #headersContainer;

  /**
   * @param {FilmsModel} filmsModel
   */
  constructor(headerContainer, filmsModel) {
    this.#filmsModel = filmsModel;
    this.#headersContainer = headerContainer;

    this.#filmsModel.addObserver(this.#onFilmUpdated);
  }

  init() {
    const watchedCount = this.#filmsModel.getFilmsCount(FilterType.HISTORY);
    const newView = new ProfileView(watchedCount);
    if (this.#profileView) {
      replace(newView, this.#profileView);
    }
    else {
      render(newView, this.#headersContainer);
    }

    this.#profileView = newView;
  }

  // eslint-disable-next-line no-unused-vars -- not used in this callback
  #onFilmUpdated = (updateType, filmId) => {
    if (updateType === UpdateType.FILM_UPDATE) {
      this.init();
    }
  };
}
