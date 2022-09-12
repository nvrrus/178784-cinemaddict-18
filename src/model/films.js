import { Constants } from '../constants.module';
import { MockConstants } from '../mock/mock-constants';
import { getFilm } from '../mock/mock-film';
import { updateItem } from '../utils/common';

export default class FilmsModel {
  #films;

  constructor() {
    this.#films = Array.from({ length: MockConstants.FILMS_COUNT }, getFilm);
  }

  get = () => this.#films;
  getById = (id) => this.#films.find((film) => film.id === id);

  getToggleControlUpdateObject = (controlType, filmId) => {
    const film = this.getById(filmId);
    switch (controlType) {
      case Constants.CONTROL_BTN_TYPE.watchlist:
        return { isInWatchlist: !film.isInWatchlist };
      case Constants.CONTROL_BTN_TYPE.favorite:
        return { isFavorite: !film.isFavorite };
      case Constants.CONTROL_BTN_TYPE.watched:
        return {
          isAlreadyWatched: !film.isAlreadyWatched,
          watchingDate: film.isAlreadyWatched ? null : new Date().toISOString()
        };
      default:
        throw new Error(`Control type (${controlType}) not supperted`);
    }
  };

  update(id, update) {
    updateItem(this.#films, id, update);
  }
}
