import Batcher from '../batcher';
import { Constants } from '../constants.module';
import { remove, render } from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';
import AbstractFilmListPresenter from './abstract-film-list-presenter';

export default class FilmListAllPresenter extends AbstractFilmListPresenter {
  /** @type {Batcher} */
  #batcher;

  /** @type {ShowMoreButtonView} */
  #showMoreButtonView;

  constructor(filmsModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    super(filmsModel, filtersPresenter, filmPopupPresenter, filmsContainer);
    this.#batcher = new Batcher(this._filmsModel.get(), Constants.FILMS_BATCH_SIZE);
  }

  _getFilms() {
    return this.#batcher.isAny() ? this.#batcher.nextBatch() : [];
  }

  _renderNotEmptyFilmList(films, listTitle) {
    super._renderNotEmptyFilmList(films, listTitle);
    if (this.#batcher.isAny()) {
      this.#showMoreButtonView = new ShowMoreButtonView();
      render(this.#showMoreButtonView, this._filmListView.element);
      this.#showMoreButtonView.setClickHandler(this.#onShowMoreClick);
    }
  }

  #onShowMoreClick = () => {
    const batch = this.#batcher.nextBatch();
    this._renderFilmCards(batch);
    if (!this.#batcher.isAny()) {
      this.#hideShowMoreButton();
    }
  };

  #hideShowMoreButton() {
    remove(this.#showMoreButtonView);
    this.#showMoreButtonView.element.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onShowMoreClick);
  }
}
